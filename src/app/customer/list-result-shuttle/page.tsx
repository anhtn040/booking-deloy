"use client";
import { filterData, singleFilter } from "@/components/data/filter-data";
import SearchWidget from "@/components/search-widget";
import { Form } from "react-bootstrap";
import {parseDate} from "@internationalized/date";
import CustomerTicketCard from "../customer-ticket-card/page";
import { useEffect, useState } from "react";
import { searchSuttle } from "@/app/api/customer";

const ResultShuttle = () => {
  const [dataSearch, setDataSearch] = useState<any>({});
  const [suttles, setShuttles] = useState<any>([]);
  const [onSearch, setOnSearch] = useState<number>(1);

  const searchData = async () => {
    const res = await searchSuttle(dataSearch);
    setShuttles(res?.data || []);
  };

  const onSearchSuttle = async (dataSearchChild:any)=>{
    const res = await searchSuttle(dataSearchChild)
    setShuttles(res?.data)
  }

  useEffect(() => {
    console.log('dataSearch',dataSearch);
    let newTravelDate = ''

    if(dataSearch.travelDate) {
        let month = '00' + dataSearch.travelDate.month
        month = month.slice(month.length-2,month.length)

        let day = '00' + dataSearch.travelDate.day
        day = day.slice(day.length-2,day.length)

        newTravelDate = `${(dataSearch.travelDate.year)}-${month}-${day}`
    }
    onSearchSuttle({...dataSearch,travelDate: newTravelDate})
    
  }, [onSearch]);

  useEffect(() => {
    let dataSeatchLocal:any = localStorage.getItem('dataSearch')
    if(dataSeatchLocal){
      dataSeatchLocal = JSON.parse(dataSeatchLocal)
      console.log('dataSeatchLocal',dataSeatchLocal)

      setDataSearch({startPoint:dataSeatchLocal.startPoint,endPoint: dataSeatchLocal.endPoint,travelDate:parseDate(dataSeatchLocal.newTravelDate)})
      // onSearchSuttle(dataSeatchLocal);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="m-2">
          <SearchWidget
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
            setOnSearch={setOnSearch}
            onSearch = {onSearch}
          />
        </div>
        <div className="flex space-x-10 py-10 px-20">
          <div className="basis-1/4">
            <div>
              <Form className="hidden lg:block">
                <div className="py-6 bg-white p-5 border rounded-md shadow-md flex flex-col">
                  <div className="text-sm text-left font-semibold mb-4">
                    Sắp xếp
                  </div>

                  {singleFilter?.map((item) => {
                    return (
                      <label>
                        <div className="flex space-x-3">
                          <Form.Check type="radio" aria-label="radio 1" />
                          <Form.Check.Label>{item?.label}</Form.Check.Label>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="bg-white p-5 border rounded-md shadow-md mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl text-[#141414] font-bold">Lọc</div>
                    <div>
                      <button className="text-[#2474E5] font-bold">
                        Xóa lọc
                      </button>
                    </div>
                  </div>
                  {filterData?.map((item) => {
                    return (
                      <div className="flex items-center space-x-3">
                        <Form.Check type="checkbox" />
                        <Form.Check.Label>{item?.value}</Form.Check.Label>
                      </div>
                    );
                  })}
                </div>
              </Form>
            </div>
          </div>
          <div className="basis-3/4">
            <div className="w-full">
                {suttles.map((item:any)=>
                <CustomerTicketCard item={item}/>
                )}
              {/* <CustomerTicketCard />
              <CustomerTicketCard /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResultShuttle;
