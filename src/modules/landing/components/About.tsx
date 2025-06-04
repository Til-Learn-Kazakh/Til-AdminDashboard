import Image from "next/image";
import pilot from "../../../assets/pilot.png";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32 lg:py-36 xl:py-40">
      <div className="border-border bg-muted/40 dark:bg-muted/10 rounded-xl border px-6 py-12 shadow-sm md:px-10 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <Image
              src={pilot}
              alt="Pilot"
              className="h-auto w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px]"
              placeholder="blur"
              priority
            />
          </div>

          {/* Text & Stats */}
          <div className="flex flex-1 flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark dark:text-white sm:text-4xl">
              <span className="text-primary">About </span>Company
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              Qazaq Til — это современная платформа для изучения казахского
              языка. Мы используем игровые механики, адаптивный контент и мощную
              админ-панель, чтобы обучение было не только полезным, но и
              увлекательным.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-dark dark:text-white">
                  2.7K+
                </div>
                <div className="text-muted-foreground text-sm">Users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-dark dark:text-white">
                  1.8K+
                </div>
                <div className="text-muted-foreground text-sm">Subscribers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-dark dark:text-white">
                  112
                </div>
                <div className="text-muted-foreground text-sm">Downloads</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-dark dark:text-white">
                  4
                </div>
                <div className="text-muted-foreground text-sm">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
