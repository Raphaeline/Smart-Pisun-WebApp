"use client";
import React, { useState } from "react";
import Navbar from "../../../../components/Navbar";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

async function addDataToFirestore(Id: string, Nama: string, Harga: number): Promise<boolean> {
  try {
    await setDoc(doc(db, "produk", Id), {
      Nama: Nama,
      Harga: Harga,
    });
    console.log("Document added to Firestore with ID: ", Id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}

const TambahProduk = () => {
  const [Id, setId] = useState<string>("");
  const [Nama, setNama] = useState<string>("");
  const [Harga, setHarga] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const added: boolean = await addDataToFirestore(Id, Nama, Harga);
    if (added) {
      setId("");
      setNama("");
      setHarga(0);
      alert("Data added to Firebase DB");
      router.push("/produk");
    }
    else{
      alert("Failed added to Firebase DB");
    }
  };

  return (
    <main className="min-h-screen flex-col items-center p-24 bg-[#f4f9fb]">
      {/* <Navbar isDashboardPage={false} isProdukPage={true} isAdminPage={false} /> */}
      <a href="/produk" className="fixed left-64 mx-10 top-12 text-[#25B6D0]">
        Kembali
      </a>

      <form onSubmit={handleSubmit} className="flex justify-center">
        <button
          type="submit"
          className="fixed right-10 top-10 bg-[#25B6D0] hover:bg-[#64abba] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md hover:shadow-lg ml-4"
        >
          Simpan
        </button>
        <div className="flex flex-col">
          <label htmlFor="Id" className="text-black">
            ID
          </label>
          <input type="text" id="Id" value={Id} onChange={(e) => setId(e.target.value)} className="text-black" />
          <label htmlFor="Nama" className="text-black">
            Produk
          </label>
          <input type="text" id="Nama" value={Nama} onChange={(e) => setNama(e.target.value)} className="text-black" />
          <label htmlFor="Harga" className="text-black">
            Harga
          </label>
          <input type="number" id="Harga" value={Harga} onChange={(e) => setHarga(parseInt(e.target.value))} className="text-black" />
        </div>
      </form>
    </main>
  );
};

export default TambahProduk;
