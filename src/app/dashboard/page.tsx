import Image from "next/image";
import Navbar from "../../../components/Navbar";
import React from "react";

const Dashboard = () => {
  return (
    <main>
      <Navbar isDashboardPage={true} isProdukPage={false} isAdminPage={false} />

      <div className="flex min-h-screen min-W-screen flex-col items-center p-24 bg-[#f4f9fb]">
        <div className="flex ml-[200px] 2xl:ml-[260px] mr-[10px] my-[15px]">
          <div className="bg-white w-[604px] 2xl:w-[1114px] h-[224px] 2xl:h-[416px] mx-[10px] flex shadow-xl">
            <img src="/null.svg" className="w-[220px] 2xl:w-[385px] mx-[30px] 2xl:mx-[61px] my-[38px] 2xl:my-[86px]"></img>
            <div className="ml-[20px] 2xl:ml-[50px] my-[28px] 2xl:my-[86px]">
              <div className="flex">
                <p className="font-poppins text-[25px] 2xl:text-[36px] text-[#243956] font-bold">Nama Toko</p>
                <a href="" className="grid place-items-center ml-[40px]">
                  <img src="/dashboard/edit.svg" className="w-[24px] "></img>
                </a>
              </div>
              <p className="font-poppins text-[15px] 2xl:text-[20px] text-[#92AEBA] font-semibold">Alamat</p>
              <p className="font-poppins text-[10px] 2xl:text-[16px] text-[#243956] font-semibold pt-[50px]">Deskripsi</p>
              <p className="font-poppins text-[10px] 2xl:text-[16px] text-[#8E999D]">Deskripsi toko kosong</p>
            </div>
          </div>

          <div className="bg-white w-[224px] 2xl:w-[408px] h-[224px] 2xl:h-[416px] mx-[10px] shadow-xl flex flex-col">
            <p className="font-poppins text-[22px] 2xl:text-[32px] text-[#0D6D8C] font-bold place-self-center pt-[30px] 2xl:pt-[85px]">Kategori Produk</p>
            <img src="/dashboard/kategori_null.svg" className="w-[75px] 2xl:w-[150px] place-self-center"></img>
            <p className="font-poppins text-[12px] 2xl:text-[16px] text-[#243956] font-[700] place-self-center">KATEGORI PRODUK KOSONG!</p>
            <p className="font-poppins text-[10px] 2xl:text-[12px] text-[#243956] font-semibold place-self-center">Silahkan menambahkan</p>
            <p className="font-poppins text-[10px] 2xl:text-[12px] text-[#243956] font-semibold place-self-center">produk Anda</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
