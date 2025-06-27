import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSyncedCarousel() {
  useEffect(() => {
    let swiper: unknown;

    ScrollTrigger.create({
      trigger: ".carousel-wrapper",
      start: "top top",
      end: "+=2000",
      scrub: 1.5,
      onUpdate: (self) => {
        if (!swiper) {
          swiper = (document.querySelector(".swiper") as { swiper?: unknown })
            ?.swiper;
        }

        if (
          swiper &&
          typeof swiper === "object" &&
          swiper !== null &&
          "wrapperEl" in swiper &&
          "width" in swiper
        ) {
          const s = swiper as { wrapperEl: HTMLElement; width: number };
          const progress = self.progress;
          if (progress === 0) {
            gsap.to(s.wrapperEl, {
              transform: `translate3d(0px, 0, 0)`,
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            const movement = -progress * (s.width * 0.8);
            gsap.to(s.wrapperEl, {
              transform: `translate3d(${movement}px, 0, 0)`,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id='projects' className='w-full h-[300vh] bg-seashell'>
      <div className='sticky top-0 h-screen flex items-center justify-center'>
        <div className='carousel-wrapper w-full px-2 sm:px-4 md:px-8'>
          <div className='text-center mb-8 md:mb-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4'>
              Featured Projects
            </h2>
            <p className='text-gray-600 text-base sm:text-lg'>
              Scroll to explore my latest projects.
            </p>
          </div>
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides={true}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.6,
              momentumVelocityRatio: 1,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 1.3,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 48,
              },
            }}
            className='swiper !overflow-visible'
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx} className='!h-auto px-2 sm:px-4'>
                <div className='group relative bg-white shadow-lg hover:shadow-2xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square mx-auto transition-all duration-500 ease-out transform hover:-translate-y-2'>
                  <img
                    src={project.image[0]}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
                  />
                  <div className='absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1f2020]/80 to-transparent backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out p-3 sm:p-4 md:p-6 flex flex-col justify-end'>
                    <h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-white'>
                      {project.title}
                    </h3>
                    <p className='text-white/90 leading-relaxed text-sm sm:text-base md:text-lg'>
                      {project.description.length > 150
                        ? `${project.description.substring(0, 150)}...`
                        : project.description}
                    </p>
                    <div className='mt-4 md:mt-8 flex gap-2 md:gap-4 flex-wrap'>
                      {project.github && (
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center text-white font-medium bg-blue-600 hover:bg-blue-700 px-3 py-2 md:px-5 md:py-3 transition-colors text-sm md:text-lg rounded'
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center text-white font-medium bg-green-600 hover:bg-green-700 px-3 py-2 md:px-5 md:py-3 transition-colors text-sm md:text-lg rounded'
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
