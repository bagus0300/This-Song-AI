"use client";
import { SongContext, TokenContext } from "@/context/ContextProvider";
import {
  getClientAccessToken,
  getTrack,
  hasClientTokenExpired
} from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import Lyrics from "@/components/lyrics";
import { useSession } from "next-auth/react";

const Page = ({ params }) => {
  /**
   * STATE VARIABLES
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [status, setStatus] = useState(null);
  const [song, setSong] = useState(null);

  const [scrolled, setScrolled] = useState(false);
  const { clientToken, setClientToken } = useContext(TokenContext);
  const { songID, setSongID } = useContext(SongContext);

  const { data: session } = useSession();

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  const id = params.id;
  const pathname = usePathname();

  useEffect(() => {
    // Clear the previous state variables
    // setData(null);
    setStatus(null);
    setScrolled(false);

    setSongID(null);

    const fetchData = async () => {
      let token = null;
      let accessToken = null;
      if (session && session.accessToken) {
        console.log("Getting song by id with session token");
        accessToken = session.accessToken;
      } else {
        token = clientToken;
        if (!token) {
          token = await getClientAccessToken();
          setClientToken(token);
          console.log("token", token);
          console.log("clientToken", clientToken);
          console.log("Getting song by id with brand new client token");
          accessToken = token.clientToken;
        } else {
          console.log("Found a token in TokenContext");
          if (hasClientTokenExpired(token)) {
            console.log("Token has expired");
            token = await getClientAccessToken();
            setClientToken(token);
            console.log("token", token);
            console.log("clientToken", clientToken);
          }
          console.log("Getting song by id with existing client token");
          accessToken = token.clientToken;
        }
      }
      // console.log("Getting song...");
      const data = await getTrack(id, accessToken);
      // console.log("data", data);

      if (data.status == 200) {
        setStatus(data.status);

        const thisSong = {
          id: id,
          album: data.data.album,
          artists: data.data.artists,
          link: data.data.external_urls.spotify,
          name: data.data.name,
          previewURL: data.data.preview_url,
          trackNumber: data.data.track_number
        };

        // console.log("thisSong", thisSong);

        setSongID(id);
        setSong(thisSong);
      }
    };
    catchErrors(fetchData());
  }, [id, setSongID]);

  // Run this hook when the songID changes; by that point, the DOM will be ready so the ref will be defined
  useEffect(() => {
    // Toggle the scrolled state variable when the scroll target is intersected
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setScrolled(false);
        } else {
          setScrolled(true);
        }
      },
      { threshold: 0, rootMargin: "-204px" }
    );

    const scrollTarget = ref.current;

    if (scrollTarget) {
      observer.observe(scrollTarget);
    }

    return () => {
      setScrolled(false);
      scrollTo(0, 0);
      if (scrollTarget) {
        observer.unobserve(scrollTarget);
      }
    };
  }, [songID]);

  // These two functions are used to convert the album art to a base64 string representing a shimmer effect, which is used as a placeholder for the Image component
  // https://image-component.nextjs.gallery/shimmer
  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  const shimmer = (
    w,
    h
  ) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                // "flex flex-row items-center justify-center align-middle w-full fixed top-[56px] lg:left-[256px] lg:w-[calc(100dvw-256px-8px)] lg:top-0 md:gap-5",
                "flex flex-row items-center justify-center align-middle w-full fixed top-[calc(56px+48px)] lg:left-[calc(288px+16px)] lg:w-[calc(100dvw-256px-8px)] lg:top-[calc(56px+8px+8px)] md:gap-5",
                "bg-background"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <Link
                href="/song"
                style={{
                  cursor: "default"
                }}
              >
                <motion.div
                  className="relative group"
                  style={{
                    width: scrollHeight,
                    height: scrollHeight
                  }}
                >
                  {/* <Image
                    className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                    src={song.album.images[1].url}
                    width={300}
                    height={300}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}
                    alt="Album art"
                  />
                  <Image
                    className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                    src="/images/refresh.png"
                    alt="Refresh icon"
                    width={300}
                    height={300}
                  /> */}
                  <img
                    className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                    src={song.album.images[1].url}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}
                    alt="Album art"
                  />
                  <img
                    className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                    src="/images/refresh.png"
                    alt="Refresh icon"
                  />
                </motion.div>
              </Link>
              <div
                className={clsx(
                  "relative flex flex-col justify-center transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit w-[0%] opacity-0",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px] flex-grow md:flex-grow-0"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1 className="transform-all duration-500 text-base font-extra bold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px]">
                  {song.name}
                </h1>
                <h2 className="transform-all duration-500 text-base text-muted xl:text-2xl lg:text-lg min-w-[300px]">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </h2>
                <h3 className="transform-all duration-500 text-base xl:text-xl lg:text-lg min-w-[300px]">
                  {song.album.name}
                </h3>
              </div>
            </motion.div>
          </div>
          <div
            // id="scroll-target"
            ref={ref}
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-opacity duration-500 md:h-0 overflow-hidden"
              // scrolled ? "opacity-0 -z-10" : "opacity-100"
            )}
          >
            <h1 className="text-3xl font-extrabold text-[#1fdf64]">
              {song.name}
            </h1>
            <h2 className="text-2xl text-muted">
              {song.artists.map((artist) => artist.name).join(", ")}
            </h2>
            <h3 className="text-xl text-">{song.album.name}</h3>
          </div>
          {/* <Lyrics
            songName={song.name}
            artistName={song.artists[0].name}
            albumName={song.album.name}
          /> */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
          doloremque, voluptatem vel dicta, laboriosam quam quaerat deserunt
          autem veniam inventore harum hic praesentium nam minus! Possimus iusto
          quos obcaecati aut ducimus natus odio animi ab debitis voluptate at
          impedit perspiciatis, inventore ullam veniam numquam et illum, soluta
          minima. Suscipit, debitis repudiandae vel eum voluptas, placeat nulla
          totam harum, nemo expedita sit vitae fugit assumenda magni dolorem? At
          laboriosam error eligendi, nobis commodi, corrupti quas in numquam
          aspernatur aliquid cupiditate voluptatibus dolor nihil voluptates
          quibusdam eveniet tenetur. Labore fugit itaque doloribus omnis?
          Ratione, deserunt. Adipisci dicta temporibus reprehenderit itaque
          alias. Veniam, laborum eaque voluptate eos perspiciatis laboriosam
          repellat expedita explicabo ducimus ipsa voluptates nemo ea quas quis
          aut hic! Asperiores et ducimus ipsum corporis ratione odit quaerat
          deserunt, delectus tempora laudantium, dolore similique animi id
          eveniet modi nisi voluptatum fuga eius fugiat harum voluptate commodi!
          Illo minus aspernatur iure. Illo ratione molestias officia ex iste?
          Ratione, maxime dolorum? Doloribus eum enim voluptatibus sunt possimus
          accusamus tempora obcaecati officiis esse laborum. Expedita porro ab
          dignissimos id, quidem facere, cupiditate saepe eligendi corporis
          alias nostrum, iure esse unde. Distinctio quidem quo odit quaerat
          veniam et omnis cum suscipit, laborum fugit. Id iusto animi aut
          aliquam debitis, expedita iure libero velit repellendus iste provident
          enim quia non eos omnis illum natus earum incidunt unde nisi nesciunt
          dolor. Delectus quisquam mollitia est laboriosam dignissimos saepe
          omnis, nam aut placeat similique quae libero dolor voluptate ratione
          dolorem eos, eligendi et suscipit. Omnis necessitatibus unde modi
          consequatur quibusdam, eligendi repudiandae molestiae itaque? Quis,
          iste quas! Veniam quo pariatur rerum molestiae consequuntur aliquam
          dolores praesentium, commodi laborum quaerat mollitia quasi quos?
          Repellat repudiandae asperiores cum fuga harum, quam error non officia
          aperiam, rerum totam odit placeat corrupti optio. Expedita repellendus
          autem numquam non debitis. Accusamus, quos aliquid! Corporis beatae,
          nobis velit commodi deleniti harum dolorum adipisci ipsum eveniet
          facilis sunt at cum. Incidunt sunt eveniet placeat eius odit ducimus
          quis nam delectus, optio sequi atque, unde quidem! Consequatur magni
          temporibus quia sint sed id pariatur qui. Suscipit totam voluptas et
          eligendi fuga consectetur molestias laborum ducimus autem nesciunt.
          Voluptate temporibus magnam ab adipisci sapiente, quis magni dolorum,
          cum minus tempore saepe? Eaque vitae, dolorum inventore dolorem
          molestiae aspernatur officiis ab temporibus! Illo temporibus odio
          minus aperiam officiis libero eligendi inventore, placeat ipsum
          dignissimos impedit non dolorem aut cum consequuntur molestias dicta
          neque quaerat labore, tempora odit nulla incidunt necessitatibus
          tempore. Quo doloribus placeat fugit quod error, distinctio unde
          deleniti, quos tempora nobis sequi doloremque ab architecto, ipsa hic
          similique sed consequuntur quae dolore veritatis eveniet adipisci
          dignissimos minima rerum? Quam delectus repellat deserunt quaerat
          nostrum rerum fugiat eaque cum eius? Minus deserunt sint maiores,
          magnam perspiciatis, fuga ratione praesentium necessitatibus, repellat
          vel pariatur. Harum non incidunt, corrupti maiores temporibus, tempore
          commodi eaque officiis beatae laudantium porro quod, adipisci
          accusantium. Vitae, molestiae dignissimos amet error similique aliquam
          esse quaerat eum consectetur molestias. Dolorem nostrum at vero
          molestias, magnam velit quas voluptas, pariatur accusamus tempore
          assumenda numquam, nemo veniam commodi laborum necessitatibus omnis
          quibusdam culpa quam totam hic. Repudiandae illo praesentium harum eos
          eveniet illum dignissimos ex eius quae odio debitis a, numquam, fuga
          soluta magnam est, vero fugit expedita quidem autem in dicta! Minima
          nulla laboriosam, dolor beatae tempora excepturi a iste, nostrum
          fugiat rem delectus dolore numquam quae labore nobis natus quasi?
          Accusamus aut, voluptatem debitis aperiam cumque vero quos atque, non
          amet porro molestias eius reiciendis molestiae velit. Doloremque
          aliquid aspernatur aliquam architecto adipisci eos recusandae aperiam
          libero, illum vero, est dolorum nam! Dolorem vitae a amet dolores.
          Voluptatibus, enim. Similique mollitia deleniti fugiat, at dicta
          blanditiis, consequatur animi, ipsam nobis doloribus excepturi
          voluptas laborum tempora tenetur eaque laudantium qui repellat
          voluptate! A corporis totam recusandae sunt soluta sed et nemo nam.
          Eius, possimus distinctio, hic dolore modi nam iusto fugiat natus non
          assumenda dolor odio quidem doloribus quibusdam molestiae, nulla
          inventore. Aperiam, non quibusdam optio eum, excepturi ipsum,
          consequatur reprehenderit similique odio sapiente ad labore veritatis
          repellendus et. Consequatur voluptas debitis, molestias odit
          praesentium autem itaque sit dicta obcaecati cum optio minus est
          repellat eaque, expedita omnis non accusantium quaerat modi.
          Asperiores adipisci dolorum, libero rerum quas, aut alias sed ullam
          aperiam excepturi molestias deleniti, atque fugit sequi. Accusamus
          soluta iusto magnam quis tempora asperiores velit molestias laudantium
          consectetur, magni perferendis commodi repudiandae cupiditate
          veritatis eveniet odit ipsam vel obcaecati ab eos harum similique
          maxime doloribus. Cupiditate ea quos corporis officiis saepe.
          Voluptatum perspiciatis, maxime temporibus voluptate neque nam dolorem
          rem hic voluptatibus ad, nihil reprehenderit similique odio expedita?
          Quod, at fuga ut accusantium, voluptate sit deserunt dolore
          exercitationem rem distinctio illum quam praesentium alias enim totam.
          Incidunt iusto iste earum fugit enim ipsa necessitatibus ad ratione
          blanditiis sunt quaerat maxime, animi pariatur rerum cum eum minima.
          Saepe accusantium nihil est distinctio sunt aliquam minus officia
          magnam fugit, magni, ad obcaecati placeat. Sunt, commodi sequi, sit
          harum aliquid ratione saepe, deserunt nam eaque provident ad? Eaque,
          voluptate. Quasi obcaecati facere fugiat autem, distinctio ad tenetur
          corporis commodi? Harum, fuga dolorem vero non quam porro debitis
          molestiae magni. Vel hic totam harum ullam ab obcaecati, aperiam ex.
          Deleniti, itaque, similique error impedit ipsam voluptate harum at
          voluptatem maxime velit in optio corporis repudiandae iure repellat
          odit numquam assumenda quaerat unde ea. Deleniti est illo alias atque
          modi reiciendis commodi, inventore beatae aperiam iusto ipsum
          perferendis. Vero, soluta veritatis, fugit natus officia fugiat
          accusantium quis mollitia quasi hic dicta! Exercitationem ducimus
          consectetur unde nemo ab ipsum maxime quaerat perferendis ex iure a,
          est quidem modi rem autem magnam qui eos totam. Voluptate, mollitia
          alias nesciunt consequatur eveniet perspiciatis eius fuga sunt
          officiis. Reprehenderit, nostrum, numquam blanditiis cupiditate est
          beatae id magnam atque laborum excepturi tempore cumque ipsa illum
          perspiciatis ipsam ea sed quia voluptatem ut asperiores fuga ratione
          corporis, veritatis suscipit. Excepturi quibusdam sunt fugit et
          architecto maxime inventore nulla alias commodi assumenda, provident
          doloribus sed accusamus in nostrum eum, esse atque quam. Explicabo
          amet voluptatibus velit, incidunt facilis iusto sapiente quasi saepe
          ab fuga temporibus officiis dolorem eveniet mollitia perferendis iste
          quas voluptates commodi ipsum. Tenetur possimus accusamus eveniet
          ratione ipsum, deserunt reprehenderit rerum saepe ipsa ipsam omnis
          velit ad explicabo?
        </>
      )) ||
        (status >= 400 && (
          <>
            <p className="relative top-[56px]">
              Error retrieving data from Spotify.
            </p>
          </>
        )) || (
          <>
            <div className="flex flex-col items-center justify-center w-full gap-1 align-middle md:flex-row md:gap-5">
              <Skeleton className="w-[300px] h-[300px]" />
              <div className="flex flex-col items-center justify-center gap-1">
                <Skeleton className="w-[400px] h-[36px]" />
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[250px] h-[28px]" />
              </div>
            </div>
          </>
        )}
    </section>
  );
};

export default Page;
