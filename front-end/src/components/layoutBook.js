import React from "react";
import Image from "next/image";
import Link from "next/link";



// sharp("path-to-your-image.jpg")
//   .resize(10) // Resize to a very small image
//   .toBuffer()
//   .then((data) => {
//     const base64 = data.toString("base64");
//     const blurDataURL = `data:image/jpeg;base64,${base64}`;
//     console.log(blurDataURL); // Copy this output for use in your Next.js component
//   });
export default function LayoutBook({ books }) {
  return (
    <div className="grid  grid-cols-5 gap-4 gap-y-10">
      {books?.map((book) => (
        <ul className="rounded-lg">
          <Link href={`/detail-book/${book.id}`} key={book.id}>
            <div className="ttransition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ">
              {book.imageBook && (
                <Image
                  className=" rounded-lg"
                  src={book.imageBook}
                  width={250}
                  height={300}
                  placeholder="blur"
                  blurDataURL="https://res.cloudinary.com/dydapdphs/image/upload/v1721295527/Quy_lu%E1%BA%ADt_v%C5%A9_tr%E1%BB%A5_vft0ls.jpg"
                  alt="book"
                />
              )}
            </div>
            <div className="mt-2 font-bold">{book.nameBook}</div>
          </Link>
        </ul>
      ))}
    </div>
  );
}
