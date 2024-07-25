import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

export default function LayoutBook({ books }) {
  return (
    <div className="grid  grid-cols-5 gap-4 gap-y-10">
      {books?.map((book) => (
        <ul className="rounded-lg" key={book.id}>
          <Link href={`/detail-book/${book.id}`}>
            <div className="ttransition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ">
              {book.imageBook && (
                <Image
                  className=" rounded-lg"
                  src={book.imageBook}
                  width="500" // Transform the image: auto-crop to square aspect_ratio
                  height="500"
                  alt={book.nameBook}
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
