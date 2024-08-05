'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoginModal from "./modal.login"
import SearchOrderDetailModal from "./modal.search-orderdetail"
const AppHeader = () => {


  const router = useRouter()

  const HandleButton = () => {
    router.push("/")
  }
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showModalOrderDetail, setShowModalOrderDetail] = useState<boolean>(false)
  return (
    <>
      <div className=" bg-[#2474E5] z-50 text-white-800">
        <div className="flex h-16 items-center justify-between px-5 lg:px-20">
          <div className="flex items-center">
            <div>

              <button onClick={() => HandleButton()}><img
                src="https://storage.googleapis.com/fe-production/svgIcon/icon_vxr_full_2.svg"
                alt="logo"
              /></button>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => setShowModalOrderDetail(true)}
              className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 
              active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-4">
              Tra cứu đơn đặt</button>
            <button onClick={() => setShowModal(true)}
              className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 
              active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Login
            </button>
            <LoginModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
            <SearchOrderDetailModal
              showModal={showModalOrderDetail}
              setShowModal={setShowModalOrderDetail}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AppHeader;