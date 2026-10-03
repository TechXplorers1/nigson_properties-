import { Injectable, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private zone = inject(NgZone);
  private observer: IntersectionObserver | null = null;

  public initScrollObserver(): void {
    if (typeof window === 'undefined') return;

    // Run outside Angular change detection for maximum 60fps/120fps performance
    this.zone.runOutsideAngular(() => {
      if (this.observer) {
        this.observer.disconnect();
      }

      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              // Unobserve element once revealed to free memory
              this.observer?.unobserve(entry.target);
            }
          });
        }, {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.1
        });
      }

      // Allow DOM to settle before querying
      setTimeout(() => {
        this.scanAndObserve();
      }, 60);
    });
  }

  public scanAndObserve(): void {
    if (typeof document === 'undefined') return;

    const targets = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-stagger'
    );

    targets.forEach(el => {
      // Elements already visible in initial viewport reveal immediately
      const rect = el.getBoundingClientRect();
      const inView = rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
      
      if (inView) {
        el.classList.add('is-revealed');
      } else if (this.observer) {
        this.observer.observe(el);
      } else {
        // Fallback for environments without IntersectionObserver
        el.classList.add('is-revealed');
      }
    });
  }
}
