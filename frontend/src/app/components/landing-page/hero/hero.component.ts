import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { HeroSlide } from '../landing.types';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) slides: HeroSlide[] = [];
  @Output() startPlanning = new EventEmitter<void>();
  @ViewChildren('heroVideo') private videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  activeIndex = 0;
  private autoplayTimer: number | undefined;
  private syncFrame: number | undefined;

  ngAfterViewInit() {
    this.startAutoplay();
    this.scheduleVideoSync();
    this.videoElements.changes.subscribe(() => this.scheduleVideoSync());
  }

  ngOnDestroy() {
    if (this.autoplayTimer) {
      window.clearInterval(this.autoplayTimer);
    }

    if (this.syncFrame) {
      window.cancelAnimationFrame(this.syncFrame);
    }
  }

  selectSlide(index: number) {
    this.setActiveIndex(index);
    this.resetAutoplay();
  }

  scrollToThemes() {
    document.querySelector('#themes')?.scrollIntoView({ behavior: 'smooth' });
  }

  private startAutoplay() {
    if (!this.slides.length) {
      return;
    }

    this.autoplayTimer = window.setInterval(() => {
      this.setActiveIndex((this.activeIndex + 1) % this.slides.length);
    }, 7000);
  }

  private resetAutoplay() {
    if (this.autoplayTimer) {
      window.clearInterval(this.autoplayTimer);
    }
    this.startAutoplay();
  }

  private setActiveIndex(index: number) {
    this.activeIndex = index;
    this.scheduleVideoSync();
  }

  private syncVideos() {
    if (!this.videoElements) {
      return;
    }

    this.videoElements.forEach((videoRef, index) => {
      const video = videoRef.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.playsInline = true;
      video.preload = 'auto';

      if (index === this.activeIndex) {
        this.playVideo(video);
      } else {
        video.pause();
      }
    });
  }

  private scheduleVideoSync() {
    if (this.syncFrame) {
      window.cancelAnimationFrame(this.syncFrame);
    }

    this.syncFrame = window.requestAnimationFrame(() => {
      this.syncVideos();
      this.syncFrame = undefined;
    });
  }

  private playVideo(video: HTMLVideoElement) {
    if (!video.currentSrc) {
      return;
    }

    if (video.readyState === 0) {
      const handleLoadedData = () => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      };

      video.addEventListener('loadeddata', handleLoadedData, { once: true });
      video.load();
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }
}
