import { Button } from "@/components/ui/button";
import Image from "next/image";
import { rajdhani } from "@/components/ui/fonts";

// import { accessToken, logout } from "@/lib/spotify";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   setToken(accessToken);
  // }, []);

  return (
    <main className="flex flex-col items-center justify-evenly">
      <section>
        <p>page.jsx</p>
        {/* <a className="App-link" href="http://localhost:8000/login">
          Log in to Spotify
        </a> */}
        <Image
          src="/next.svg"
          width={300}
          height={300}
          className="hidden md:block"
          alt="Next.js logo"
        />
        <Image
          src="/vercel.svg"
          width={100}
          height={100}
          className="block md:hidden"
          alt="Vercel logo"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque rerum
          numquam officiis voluptates corporis quisquam eaque ipsam placeat ea!
          Dolore provident illum quidem. Minima eius dolores reiciendis deserunt
          obcaecati optio eos maiores ad, quasi perferendis quis aliquid quidem
          quaerat! Minima ea voluptatibus officiis, libero, perferendis
          assumenda id deleniti nam consequatur eveniet blanditiis. Iste illum
          repellat unde aperiam beatae veniam ut, culpa, ducimus nemo aliquam
          expedita vero soluta quaerat quidem deserunt, quo impedit saepe!
          Ratione eos sunt facilis impedit quis tempore culpa vel debitis,
          aliquid nam ullam qui! Praesentium beatae dicta, fugit voluptatem iste
          voluptates quidem obcaecati consectetur quibusdam, in nesciunt
          molestiae iure dolores, nam amet. Perferendis, vel! Debitis
          consequatur labore, itaque ad impedit dicta facilis totam saepe
          repellat ipsa rem quasi repellendus sit, inventore, perferendis
          delectus aliquam eligendi. Blanditiis inventore, asperiores tenetur
          distinctio vero exercitationem maiores labore beatae veniam fugit quos
          doloremque corporis ea corrupti quis voluptatem dolore necessitatibus
          temporibus voluptatibus obcaecati sequi eaque libero nam. Eligendi
          impedit recusandae sunt reprehenderit cupiditate autem ipsam quas
          excepturi, numquam possimus aspernatur, aut voluptates delectus illo
          repudiandae neque perspiciatis, sint temporibus! Fugit quibusdam odio
          voluptatem cupiditate labore provident vel est voluptatum officiis
          quia voluptate, voluptatibus ipsam aliquam? Quam error similique
          blanditiis fugit asperiores obcaecati repellendus ullam fuga impedit
          sequi ipsum, unde cumque ad labore quibusdam esse. Nostrum vero
          deleniti debitis nemo accusantium, ratione at consequatur itaque unde
          voluptates autem hic consectetur inventore vel maiores voluptas totam
          magni saepe. Repudiandae fugit quidem sapiente quae rem eius
          consectetur aspernatur eos neque enim, deserunt laboriosam temporibus
          error inventore explicabo quasi excepturi laborum reiciendis incidunt
          nostrum dolorem repellendus? Possimus recusandae suscipit amet,
          ducimus tempore, repudiandae, sint assumenda molestias inventore quis
          maxime esse eligendi sequi deleniti? Voluptates labore odit quos dolor
          facere! Ducimus fuga dolore consequatur magnam fugit nam, temporibus
          ipsum maiores nihil sed. Quod dolore placeat id qui consectetur,
          voluptates nostrum in! Provident, labore sunt. Deserunt ipsa aliquam
          aperiam reprehenderit optio ea quas repudiandae doloremque labore
          tempore et perspiciatis non, sequi, repellat porro fuga rerum commodi.
          Maiores quisquam perferendis qui autem laboriosam provident ipsam, cum
          repellendus fugit beatae. Exercitationem fuga quidem eum sint libero
          corrupti hic molestiae, quod quasi rerum beatae voluptate ducimus?
          Recusandae officiis dolore officia!
        </p>
      </section>
    </main>
  );
}
