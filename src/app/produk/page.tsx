"use client";
import React, { useEffect, useState } from "react";
// import Navbar from "../../../components/Navbar";
import { db } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
// import requireAuth from "../../firebase/middleware/requireAuth";

const Navbar = ({ isDashboardPage, isProdukPage, isAdminPage }: { isDashboardPage: boolean; isProdukPage: boolean; isAdminPage: boolean }) => {
  return (
    <nav className="w-[200px] xl:w-[250px] fixed bg-white top-0 left-0 right-0 min-h-full shadow-xl">
      <div className="flex p-[20px]">
        <div className="m-[10px] w-[50px]">
          <img src="/Logo1.svg" alt="My Image" />
        </div>
        <div className="m-[6px] 2xl:m-[10px] flex flex-col">
          <p className="text-[#0D6D8C] text-[14px] 2xl:text-[18px] font-jakarta font-semibold tracking-[5.6px]">TuBi</p>
          <p className="text-[#0D6D8C] text-[16px] 2xl:text-[20px] font-jakarta font-semibold whitespace-nowrap overflow-hidden">Manajer Toko</p>
        </div>
      </div>
      <ul>
        <li>
          <a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="/dashboard">
            <img src={isDashboardPage ? "/dashboard_blue.svg" : "/dashboard.svg"} alt="Dashboard" className="w-[18px] 2xl:w-[28px]" />
            <p className={isDashboardPage ? "text-[#25B6D0] font-poppins text-[16px] 2xl:text-[20px] px-[6px]" : "text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]"}>Dasboard</p>
          </a>
        </li>
        <li>
          <a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="/produk">
            <img src={isProdukPage ? "/produk_blue.svg" : "/produk.svg"} alt="Produk" className="w-[18px] 2xl:w-[28px]" />
            <p className={isProdukPage ? "text-[#25B6D0] font-poppins text-[16px] 2xl:text-[20px] px-[6px]" : "text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]"}>Produk</p>
          </a>
        </li>
        <li>
          <a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="#">
            <img src={isAdminPage ? "/admin_blue.svg" : "/admin.svg"} className="w-[18px] 2xl:w-[28px]" />
            <p className="text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]">Admin</p>
          </a>
        </li>
        <li>
          <a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="#">
            <img src="/bantuan.svg" alt="Dashboard" className="w-[18px] 2xl:w-[28px]" />
            <p className="text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]">Bantuan</p>
          </a>
        </li>
        <div className="flex px-[28px] py-[14px] 2xl:py-[20px]">
          <button
            className=" bg-[#FF5C5C] hover:bg-[#FF5C5C] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md hover:shadow-lg"
            onClick={() => (window.location.href = "/")}
          >
            Logout
          </button>
        </div>
      </ul>
    </nav>
  );
};

interface ProdukData {
  id: string;
  Nama: string;
  Harga: number;
}

async function fetchDataFromFirestore(): Promise<ProdukData[]> {
  const querySnapshots = await getDocs(collection(db, "produk"));
  const data: ProdukData[] = [];
  querySnapshots.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as ProdukData);
  });
  return data;
}

const Produk = () => {
  const [produkData, setProdukData] = useState<ProdukData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("produk");
  const itemsPerPage: number = 5;
  const router = useRouter();

  // const handleEdit = (id: string, Nama: string, Harga: number) => {
  //   console.log("Tombol edit ditekan untuk id:", id);
  //   router.push(`/produk/edit/${id}?Nama=${Nama}&Harga=${Harga}`);
  // };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (isConfirmed) {
      await deleteDoc(doc(db, "produk", id));
      setProdukData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setProdukData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const sortData = () => {
      let sortedData = [...produkData];
      switch (filter) {
        case "produk":
          sortedData.sort((a, b) => a.Nama.localeCompare(b.Nama));
          break;
        case "UPC":
          sortedData.sort((a, b) => a.id.localeCompare(b.id));
          break;
        case "Harga":
          sortedData.sort((a, b) => a.Harga - b.Harga);
          break;
        default:
          break;
      }
      setProdukData(sortedData);
    };

    sortData();
  }, [filter, produkData]);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: ProdukData[] = produkData.slice(indexOfFirstItem, indexOfLastItem);

  const paginatePrevious = () => setCurrentPage(currentPage - 1);
  const paginateNext = () => setCurrentPage(currentPage + 1);

  return (
    <main className="min-h-screen flex-col items-center p-24 bg-[#f4f9fb]">
      <Navbar isDashboardPage={false} isProdukPage={true} isAdminPage={false} />

      <div className="fixed right-10 top-10">
        <a href="/produk/tambahProduk" className="bg-[#25B6D0] hover:bg-[#64abba] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md hover:shadow-lg ml-4">
          Tambah Produk
        </a>
      </div>

      <div className="fixed right-10">
        <select id="filter" name="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="font-poppins text-[15px] text-[#243956] w-[135px] 2xl:w-[165px] h-[32px] 2xl:h-[48px]  pl-10 rounded border border-[#D4E3E8]">
          <option value="produk">Produk</option>
          <option value="UPC">UPC</option>
          <option value="Harga">Harga</option>
        </select>
      </div>

      <div className="fixed left-64 ml-10 mt-16">
        <table>
          <thead className="bg-[#E4F2F6]">
            <tr>
              <th className="border border-[#D4E3E8] text-black py-[15px] px-[5px] font-poppins text-[16px] w-[300px] max-w-[300px] 2xl:w-[595px] 2xl:max-w-[595px]">Produk</th>
              <th className="border border-[#D4E3E8] text-black py-[15px] px-[5px] font-poppins text-[16px] w-[150px] max-w-[150px] 2xl:w-[225px] 2xl:max-w-[225px]">UPC</th>
              <th className="border border-[#D4E3E8] text-black py-[15px] px-[5px] font-poppins text-[16px] w-[150px] max-w-[150px] 2xl:w-[225px] 2xl:max-w-[225px]">Harga</th>
              <th className="border border-[#D4E3E8] text-black py-[15px] px-[5px] font-poppins text-[16px]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((produk) => (
              <tr className="bg-white" key={produk.id}>
                <td className="border-y border-y-[#E0E0E0] text-black py-[15px] px-[30px] font-poppins text-[12px] 2xl:text-[16px] w-[300px] max-w-[300px] 2xl:w-[595px] 2xl:max-w-[595px] flex items-center">{produk.Nama}</td>
                <td className="border-y border-y-[#E0E0E0] text-black py-[15px] px-[30px] font-poppins text-[12px] 2xl:text-[16px] w-[150px] max-w-[150px] 2xl:w-[225px] 2xl:max-w-[225px] text-center">{produk.id}</td>
                <td className="border-y border-y-[#E0E0E0] text-black py-[15px] px-[30px] font-poppins text-[12px] 2xl:text-[16px] w-[150px] max-w-[150px] 2xl:w-[225px] 2xl:max-w-[225px] text-center">Rp {produk.Harga},00</td>
                <td className="border-y border-y-[#E0E0E0] text-black py-[15px] px-[30px] font-poppins text-[12px] 2xl:text-[16px] text-center">
                  {/* <button
                    onClick={() => handleEdit(produk.id, produk.Nama, produk.Harga)}
                    className="bg-[#25B6D0] hover:bg-[#64abba] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md hover:shadow-lg mr-2"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(produk.id)}
                    className="bg-[#FF5C5C] hover:bg-[#FF5C5C] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tambahkan navigasi pagination */}
      <div className="pagination b-10 flex justify-center">
        <button className="bg-[#55A3BD] hover:bg-[#5495a2] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md shadow-md mr-4" onClick={paginatePrevious}>
          Previous
        </button>
        <button className="bg-[#55A3BD] hover:bg-[#5495a2] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md shadow-md mr-4" onClick={paginateNext}>
          Next
        </button>
      </div>
    </main>
  );
};

export default Produk;
