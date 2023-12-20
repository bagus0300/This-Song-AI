import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1>Logged in as {session?.user?.name}</h1>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id maiores
      praesentium error neque iure eos quas placeat, et aut quibusdam repellat
      officia omnis, vitae, maxime molestias. Obcaecati odit nam vero? Neque sit
      itaque tenetur. Quos sapiente laudantium hic impedit incidunt, veritatis
      ratione, ea quia in aut, corporis repellat. In, fugiat voluptates
      consequatur ratione nam facere recusandae consequuntur enim a delectus
      iste numquam nesciunt maxime repellat, beatae, odio odit non quis
      provident exercitationem! Pariatur, error dolorem culpa veritatis iste
      laudantium possimus dicta magni officia suscipit tempora, nisi praesentium
      nam quam maxime similique repudiandae id a quos cumque voluptas, quas
      asperiores animi? Totam odit cupiditate, officia temporibus nulla omnis
      eum illum molestiae incidunt quos quasi nihil ipsam accusamus consectetur
      nobis quo, et magni velit dicta quis. Voluptate nobis laboriosam deserunt
      totam voluptatem ipsum dicta nesciunt blanditiis quibusdam dolores illo
      inventore, nihil ea magnam dolore illum qui quae explicabo nulla
      molestiae! Dolore voluptatibus voluptates accusamus ex qui praesentium
      culpa laborum delectus reiciendis provident enim a nam, velit corporis
      impedit, tenetur nostrum sed perspiciatis officia? Eos, eaque. Quod ipsa
      eaque laborum inventore nisi dolor harum tenetur, dolorem ipsam voluptas
      mollitia minus quia reiciendis quas accusantium. Officia ut dolor sapiente
      corporis saepe! Facere, perspiciatis. Similique tenetur voluptas fugit sit
      mollitia, fugiat assumenda explicabo nobis quod fuga vero autem corrupti.
      Aliquam quae odit, ullam quas dolores totam sit hic iure eligendi delectus
      tempore animi saepe atque itaque necessitatibus. Provident sed magni
      laboriosam cum ducimus assumenda quo illum quia est officiis? Neque iure
      non pariatur? Sunt cumque iure iste vel odit illo, nam sit mollitia
      dignissimos delectus veritatis enim tenetur! Mollitia at modi rem velit
      veritatis voluptates nesciunt, maiores animi. Minus adipisci explicabo
      soluta eveniet fugit similique accusamus illum facilis perspiciatis, dolor
      quae voluptatum, sit blanditiis consectetur sapiente illo placeat!
      Consequuntur deserunt quam veritatis fugiat vero vitae aut, nemo
      laboriosam quisquam dignissimos neque soluta tempora at delectus unde
      nulla maiores laborum magnam, ipsa accusantium similique ab voluptatibus?
      Iusto blanditiis, quibusdam magnam commodi dicta suscipit voluptatum
      labore dolor itaque sed, architecto ratione, vero perspiciatis enim totam.
      Facere, nihil doloremque voluptatem iure debitis laudantium eius sequi
      mollitia, nam veniam praesentium recusandae officiis voluptatibus ipsa! A
      laborum, voluptate mollitia qui inventore eum sint quia pariatur, itaque
      nihil, corporis quisquam possimus placeat iste. Laborum ad praesentium
      pariatur neque deserunt quas molestias inventore error impedit dicta
      reiciendis ab, odio fugiat nemo culpa quod corporis eaque cumque eum
      facilis? Amet iusto, saepe, natus perferendis modi sint velit aspernatur,
      omnis animi maxime ex tempore asperiores. Facilis quibusdam maxime
      laboriosam suscipit hic id animi esse illum. Veniam, aperiam commodi.
      Animi eum hic quisquam numquam nulla deserunt excepturi at quis
      voluptatibus perferendis corporis voluptates maxime odio tenetur harum
      doloribus vitae, sed voluptate inventore nihil sit quae ipsam dolor saepe.
      Eius atque perspiciatis dignissimos adipisci consectetur esse, cupiditate,
      voluptas excepturi laboriosam fuga, dolorum magni! Ullam, atque earum
      deserunt quaerat cumque quos vel ducimus ipsum velit, nihil laborum
      temporibus molestiae, esse vitae magni est totam fuga! Corrupti, nemo
      similique deleniti voluptatum eius dignissimos repellat sit est nihil
      animi quia, maiores tenetur optio earum quaerat quas delectus! Repudiandae
      impedit quis similique sequi minus ipsum ea sapiente vitae molestiae,
      illum error placeat tempore earum aliquid numquam consequatur consectetur
      quasi dolore nihil deleniti necessitatibus deserunt quia sint optio! Aut
      aliquam quo quae, dolorum explicabo deserunt dolor excepturi? Dolore
      ducimus eos, dignissimos voluptatibus repellat aut veniam quam quaerat ea
      magnam sed libero ipsum quisquam amet explicabo veritatis tempora
      architecto. Nisi asperiores neque, unde assumenda praesentium laudantium
      aperiam tenetur deserunt veniam dicta reprehenderit, culpa velit delectus
      blanditiis inventore maiores, voluptas ea eum alias quas aut! Ut doloribus
      eaque facere quam consectetur necessitatibus deserunt doloremque possimus
      veniam adipisci, fugit ipsam minus maxime vitae animi soluta quae error
      accusamus obcaecati sunt rem beatae odit. Maiores id blanditiis sequi.
      Architecto minima consectetur tenetur. Repellat voluptatem assumenda,
      tempore delectus eos iure ipsum hic ducimus cumque commodi recusandae
      voluptas quos fugiat culpa perferendis! Excepturi magnam vel eligendi
      eius, voluptatem molestias corporis accusantium ut, dolor laudantium quis
      officia mollitia nemo illo perspiciatis alias id quae inventore
      perferendis! Quibusdam rerum ullam sit deleniti, nisi repudiandae, eius
      recusandae vero ab quos laborum sunt asperiores! Officiis voluptatum hic
      eos dignissimos enim eveniet deleniti, dolor ipsam voluptate voluptas sint
      in unde aspernatur sed earum, vel placeat tempora a veniam veritatis
      exercitationem, ab odio. Veniam voluptatem dolores quam, odit repellat
      alias placeat atque nobis asperiores magni minima. Dolorem accusantium at
      ducimus quod et aliquam saepe facere, eum vel animi ipsum aspernatur.
      Voluptatum rem dolore, expedita maiores sunt nisi ducimus incidunt
      architecto illo nemo, blanditiis at tempora porro deleniti similique sit.
      Saepe minus nulla, fugit illum quo eum consequatur libero voluptates, cum
      voluptas doloribus quidem repellat totam aperiam ipsum magni odit!
      Voluptatum magni illo vero magnam suscipit reprehenderit quo asperiores.
      Vero, odio architecto nobis at a atque culpa magnam explicabo eveniet?
      Sapiente officia nihil accusantium tempora? Doloribus cumque molestias
      quis iste ipsum ea. Maiores voluptas libero hic iste itaque consectetur
      neque eius quis, delectus saepe illum optio soluta! Quisquam, explicabo
      sint excepturi illum vero non dolorum! Voluptates officia, iste corporis
      error porro facilis eius deleniti et debitis ratione. Harum quo, voluptate
      corporis ab officia voluptatum ut omnis autem, libero eum rerum, hic
      exercitationem porro? Distinctio nam adipisci recusandae eius magni illum
      tempore accusantium explicabo rem? Natus commodi enim possimus sunt a
      labore adipisci, ipsa quo obcaecati ab suscipit, sequi tenetur iste minima
      reprehenderit nihil, omnis ea. Iure quo sapiente temporibus deserunt
      consequuntur consequatur a molestias neque voluptates eum voluptatum iusto
      quod quibusdam id, magni adipisci? Magni nisi nulla illum tenetur sapiente
      excepturi possimus praesentium sint quisquam perspiciatis. Veritatis,
      aliquid quibusdam vitae veniam ipsum modi nostrum iusto saepe beatae
      officiis ut consectetur nemo eaque, recusandae reprehenderit optio illo
      maxime molestiae tempora asperiores, dignissimos quos neque voluptatum
      praesentium. Nam voluptate explicabo rerum perferendis veritatis vel minus
      at nisi similique ducimus. Est quaerat magni molestiae iure, temporibus
      perferendis quas omnis quisquam consectetur, soluta dolore sequi minus
      magnam asperiores tempore voluptatum qui vero laudantium corporis a
      tenetur accusamus provident? Eligendi exercitationem consequatur
      inventore, laudantium alias unde optio facere quas amet accusamus vitae
      iusto voluptatibus natus totam quos enim neque modi eum perferendis ad
      atque maxime adipisci suscipit. Magni commodi alias voluptatum ratione
      dicta.
    </div>
  );
}
