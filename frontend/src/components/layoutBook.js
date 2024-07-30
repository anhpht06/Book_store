import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

export default function LayoutBook({ books }) {
  return (
    <div className="grid grid-cols-6 gap-y-5">
      {books?.map((book) => (
        <ul className="rounded-lg" key={book.id}>
          <Link href={`/detail-book/${book.id}`}>
            <div className="ttransition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ">
              <Image
                className="rounded-lg"
                src={book?.imageBook || "/images/no-image.png"}
                width={200}
                height={200}
                alt={book.nameBook}
                priority={true}
              />
            </div>
            <div className="mt-2 font-bold">{book.nameBook}</div>
          </Link>
        </ul>
      ))}
    </div>
  );
}
