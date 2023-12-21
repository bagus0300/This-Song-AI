"use client";
import { useContext, useEffect, useRef, useState } from "react";

import { SongContext, TokenContext } from "@/context/ContextProvider";

import { getCurrentlyPlaying } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import Lyrics from "@/components/lyrics";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Page = () => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const { data: session } = useSession();

  // Init is used to determine whether the token has been read at least once
  const [init, setInit] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  const { token } = useContext(TokenContext);
  const { songID, setSongID } = useContext(SongContext);
  const [song, setSong] = useState(null);

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  useEffect(() => {
    // Awaits the song that's currently playing and sets state variables accordingly
    const getSong = () => {
      // Clear the previous state variables
      setData(null);
      setStatus(null);
      setScrolled(false);

      setSongID(null);

      scrollTo(0, 0);

      const fetchData = async () => {
        if (session && session?.accessToken) {
          console.log("Getting currently playing song...");
          console.log("session", session);
          const currentlyPlaying = await getCurrentlyPlaying(
            session.accessToken
          );
          setData(currentlyPlaying.data);
          setStatus(currentlyPlaying.status);
        }
      };
      catchErrors(fetchData());
    };

    setInit(1);
    getSong();
  }, [session?.accessToken]);

  useEffect(() => {
    if (data) {
      const thisSong = {
        id: data.item.id,
        albumArt: data.item.album.images[1].url,
        songName: data.item.name,
        artists: data.item.artists,
        albumName: data.item.album.name
      };

      // console.log("Setting song: ", thisSong);

      console.log("Song id: ", thisSong.id);
      setSongID(thisSong.id);
      setSong(thisSong);
    } else {
      setSongID(null);
      setSong(null);
    }
  }, [data, setSongID]);

  // Force a rerender when the song changes
  useEffect(() => {
    // console.log(song);

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
    console.log("Scroll target: ", scrollTarget);

    if (scrollTarget) {
      console.log("Observe");
      observer.observe(scrollTarget);
    }

    return () => {
      setScrolled(false);
      scrollTo(0, 0);
      if (scrollTarget) {
        observer.unobserve(scrollTarget);
      }
    };
  }, [song]);

  console.log("Rendering song/current/page.jsx");

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                "flex flex-row items-center justify-center align-middle w-full fixed top-[calc(56px+48px)] lg:left-[calc(288px+16px)] lg:w-[calc(100dvw-256px-8px)] lg:top-[calc(56px+8px+8px)] md:gap-5",
                "bg-background"
                // "bg-card rounded-lg",
                // "border-red-500 border-2"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <motion.div
                className="relative group"
                // className="border-2 border-red-500"
                onClick={() => {
                  // getSong(null);
                  window.location.reload();
                }}
                style={{
                  width: scrollHeight,
                  height: scrollHeight
                }}
              >
                <img
                  className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                  src={song.albumArt}
                  width={300}
                  height={300}
                  // placeholder={`data:image/svg+xml;base64,${toBase64(
                  //   shimmer(300, 300)
                  // )}`}
                  alt="Album art"
                />
                <img
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                  src="/images/refresh.png"
                  alt="Refresh icon"
                  width={300}
                  height={300}
                />
              </motion.div>
              <div
                className={clsx(
                  "relative flex flex-col justify-center transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit w-[0%] opacity-0",
                  // "border-red-500 border-2",
                  // scrolled ? "opacity-100 w-[300px]" : "w-[0%] opacity-0",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px] flex-grow md:flex-grow-0"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1
                  className="transform-all duration-500 text-base font-extra bold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px]"
                  onClick={() => {
                    console.log("scrollHeight: ", scrollHeight.current);
                  }}
                >
                  {song.songName}
                  {/* {scrolled.toString()} */}
                  {/* {song.id} */}
                  {/* {scrollHeight.current} */}
                </h1>
                <h2 className="transform-all duration-500 text-base text-muted xl:text-2xl lg:text-lg min-w-[300px]">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </h2>
                <h3 className="transform-all duration-500 text-base xl:text-xl lg:text-lg min-w-[300px]">
                  {song.albumName}
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
            <h1
              className="text-3xl font-extrabold text-[#1fdf64]"
              onClick={() => {
                console.log("scrollHeight: ", scrollHeight.current);
              }}
            >
              {song.songName}
              {/* {scrolled.toString()} */}
              {/* {song.id} */}
            </h1>
            <h2 className="text-2xl text-muted">
              {song.artists.map((artist) => artist.name).join(", ")}
            </h2>
            <h3 className="text-xl text-">{song.albumName}</h3>
          </div>
          {/* <Lyrics
            songName={song.songName}
            artistName={song.artists[0].name}
            albumName={song.albumName}
          /> */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          necessitatibus mollitia magnam adipisci quas enim obcaecati facere,
          dolor cum nulla doloremque illo, aliquam, fugiat sint. Maiores ratione
          facere placeat consectetur illum officiis recusandae doloremque
          eligendi assumenda, quibusdam modi sapiente odit totam nesciunt
          expedita alias, asperiores mollitia velit iure, praesentium corrupti!
          Hic eos, sapiente qui molestiae, modi, architecto repudiandae quod
          recusandae nesciunt beatae ducimus obcaecati vel rerum quaerat
          pariatur. Quis numquam excepturi iusto, molestias molestiae alias
          temporibus expedita architecto consequatur. Eos aut veniam maiores
          nisi esse repudiandae quisquam numquam laudantium aperiam corporis
          dolorem quibusdam ipsum tempore iure repellat iste, voluptatum, magni
          mollitia sequi! Quos, fugiat! Ea ad sed perspiciatis cumque sunt
          magnam tempora omnis hic, consequuntur laudantium odio a! Blanditiis
          saepe, esse similique molestias voluptates quo laboriosam non eos
          nostrum rem, quibusdam fuga corrupti recusandae expedita dolores amet
          magni iusto illum officiis dolorem vel animi officia! Adipisci tenetur
          ipsam corrupti saepe vero alias natus debitis nesciunt blanditiis sit
          reprehenderit architecto quasi molestiae voluptas optio repellendus
          beatae, hic expedita! Quam dolores neque, aut exercitationem eligendi
          officiis inventore pariatur voluptas dolor ab, magni voluptate unde
          quas, iusto nostrum qui. Corporis ratione maiores dolorem voluptatibus
          excepturi fugit tenetur numquam dolores dolore odit soluta ex,
          inventore perspiciatis repellat. Provident minima nostrum cumque
          deserunt cupiditate maiores asperiores quasi reprehenderit voluptatem
          suscipit culpa optio recusandae praesentium reiciendis expedita ipsum
          repellat, sed illo, quos unde amet fuga vitae quis! Beatae repellat,
          iure laboriosam provident suscipit deleniti maxime distinctio esse
          eligendi dolorem ratione, explicabo cum dolore aut ea sunt ex quia ab?
          Expedita sequi dolore totam, provident illo cupiditate, quis ipsum
          assumenda nisi fugiat maiores fugit nemo magnam tenetur repellendus
          deleniti ratione ea modi eos. Impedit, minima? Rem sit voluptatem
          reiciendis perspiciatis itaque quibusdam quos quia corporis aperiam
          odit, doloremque laborum labore sapiente necessitatibus qui deleniti
          sint ea. Adipisci debitis molestiae sint in, voluptatem enim eveniet!
          Tenetur quasi beatae voluptatum numquam deserunt. Nesciunt quaerat
          magni itaque vel exercitationem doloremque necessitatibus consequatur
          id, maiores, repellendus consectetur quos! Minima consequuntur eveniet
          amet iusto soluta vitae dignissimos qui unde atque enim officiis
          reprehenderit eos quas sapiente eligendi itaque maxime nisi, dolore
          rerum architecto cupiditate quo! Inventore quas repudiandae commodi,
          iure cupiditate nam culpa architecto tempore incidunt, sint ut,
          corporis delectus fugit aliquid dolore veritatis fuga necessitatibus
          ex beatae voluptatibus? Voluptatibus iure numquam quia molestias
          asperiores dolorum perferendis incidunt praesentium atque rem nihil
          eligendi quasi magnam suscipit dicta quibusdam assumenda odio, vel
          voluptas! Corporis labore autem commodi, minima distinctio, corrupti
          earum dolore laudantium architecto soluta beatae magnam eos iste eaque
          deserunt ipsa sunt, quibusdam a quis obcaecati facere saepe sequi
          mollitia quam. Ducimus possimus amet eos repellat voluptates beatae
          iure rerum temporibus, placeat nesciunt a minus quam tempora itaque
          commodi repellendus totam quod debitis sed optio harum sunt. Nisi
          possimus, vitae culpa dolorem repellat eius, amet voluptates beatae,
          rem debitis quae ab! Reiciendis rem magni unde tempore iusto libero ab
          culpa quae harum! Ducimus deserunt in consectetur placeat, mollitia
          animi qui nobis, explicabo excepturi omnis ab obcaecati! Repellendus,
          repudiandae deleniti recusandae tenetur nam asperiores sint unde,
          obcaecati a quasi officia illum perferendis quidem quibusdam aliquam
          voluptatem quas labore! Tempore laudantium recusandae, ea porro
          assumenda excepturi nisi sed sunt possimus incidunt voluptatibus
          suscipit dolore veniam quia obcaecati ad distinctio! Atque soluta eum
          in vitae excepturi inventore itaque molestias facilis ut veritatis
          quod, fuga laudantium pariatur ratione, reiciendis, esse at
          repudiandae praesentium ab! Quidem placeat molestias expedita, esse
          ducimus quo unde sapiente quam repellendus voluptatum maiores dolorem
          eius perspiciatis recusandae aperiam, consectetur sequi reprehenderit
          soluta, sint quos saepe cumque impedit minus! Iste optio dignissimos
          nisi similique commodi sunt veniam autem amet quo cupiditate explicabo
          voluptates qui, consectetur adipisci cumque sequi et modi! Facilis
          quos quibusdam sequi ab nam minima, autem blanditiis molestias
          perspiciatis sint dolor eligendi! Veniam, praesentium corporis
          adipisci odit autem assumenda error maxime laboriosam, ullam nobis
          obcaecati quo omnis! Eveniet similique repellendus alias, excepturi,
          dolorum ratione nemo architecto laboriosam sit incidunt sunt aliquam
          quae praesentium id tempore qui accusantium blanditiis nesciunt
          numquam quis natus quia quisquam voluptatum veritatis. Asperiores
          ipsum magni dolore alias ducimus excepturi explicabo possimus,
          repellat, dolor eos aperiam non illo laboriosam culpa vero tempore
          facilis necessitatibus natus autem quasi temporibus libero impedit
          nisi. Sed quia perspiciatis quaerat sit tempora, non, dolor doloremque
          optio corporis culpa rem nobis laborum explicabo qui mollitia est
          quisquam dolore cumque quo itaque facilis consectetur. Repellat id
          quidem cupiditate laudantium nobis mollitia odio, inventore asperiores
          ipsum iure adipisci voluptates harum cum provident eveniet aut ipsa
          quae veritatis minima pariatur nihil. Illo quas, suscipit sequi
          doloremque distinctio asperiores consequuntur necessitatibus! Cumque
          magni obcaecati nulla similique iste incidunt corporis dolores, saepe
          impedit ipsa quam vel. Repudiandae quisquam odio, quis ipsam
          necessitatibus id minus voluptates porro. Libero asperiores recusandae
          nemo explicabo nam laboriosam possimus voluptatibus nobis! Asperiores,
          error esse molestiae, voluptatibus non quo explicabo veritatis
          doloribus nemo unde, eius veniam quasi harum similique architecto
          saepe aut inventore? Laudantium quam iure ratione animi? Deleniti
          fugiat fuga maiores tenetur laboriosam recusandae facere? Quam vero
          illo at maiores accusantium asperiores! Error amet ea quos tempore
          quia assumenda culpa adipisci vero eligendi quisquam, vel reiciendis
          minima. Iusto magnam possimus ut amet nesciunt nostrum labore
          provident commodi numquam, laborum accusamus, voluptatum veritatis
          sit, rem voluptatibus sed dignissimos officiis nam corrupti
          reprehenderit hic distinctio? Minima, facilis illum vel, a cupiditate
          eveniet commodi sequi asperiores fugit ea architecto. Animi maxime
          quae voluptatem dolor veritatis expedita velit debitis saepe ducimus
          facere necessitatibus, repellat repellendus officia ipsa sint quam
          omnis unde, placeat nisi? Ratione odit ipsam architecto saepe illo
          repudiandae corporis quia cupiditate voluptate doloremque perferendis
          delectus debitis aut labore aperiam quae obcaecati voluptas, nisi
          omnis molestias sequi a repellendus illum! Voluptatum numquam eos
          mollitia dolorum repellendus? Nisi error assumenda labore, aliquid
          cupiditate, reiciendis possimus at quasi, similique eos reprehenderit
          ullam provident dolore. Perspiciatis accusamus est tenetur dolor vel
          autem, ex incidunt harum praesentium, ea necessitatibus qui adipisci
          nulla! Soluta qui voluptates tempore ullam impedit accusamus dolores
          iusto vitae rerum, facere minus non perferendis sint. Repellendus
          pariatur et esse dolore ipsam. Explicabo dolores soluta, perferendis
          quasi sapiente eius eligendi sequi, mollitia laborum, blanditiis
          aliquid? Tenetur ullam non molestiae iure esse suscipit amet
          accusantium assumenda aliquam ea voluptas nihil pariatur maiores,
          dolorem distinctio?
        </>
      )) ||
        (status == 204 && (
          <>
            <p className="">No song is currently playing.</p>
          </>
        )) ||
        (status >= 400 && (
          <>
            <p className="">Error retrieving data from Spotify.</p>
          </>
        )) ||
        // If init is false, then the token hasn't been read yet
        // This should be changed to a progress bar along with the final case, or a skeleton
        // (!init && (
        //   <>
        //     <p className="">Loading data from Spotify...</p>
        //   </>
        // )) ||
        (!session && (
          <>
            <p className="">
              Log in to Spotify to see what you&apos;re listening to.
            </p>
          </>
        )) || (
          <>
            <p className="">Loading currently playing song...</p>
          </>
        )}
    </section>
  );
};

export default Page;
