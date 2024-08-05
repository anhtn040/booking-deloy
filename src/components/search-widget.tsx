import "../app/style/customer.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCityRoute } from "@/app/api/customer";
import { useRouter } from "next/navigation";
import { MenuItem, Select } from "@mui/material";
import { Autocomplete, AutocompleteItem, DatePicker } from "@nextui-org/react";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SearchWidget = (props: any) => {
  const router = useRouter();

  const [cities, setCities] = useState<any>([]);
  const { dataSearch, setDataSearch, setOnSearch, onSearch } = props;

  const oldData = { ...dataSearch };

  const loadCities = async () => {
    const res = await getAllCityRoute();
    setCities(res?.data || []);
  };

  useEffect(() => {
    loadCities();
  }, []);

  const onChange = (key: string, value: string) => {
    const newSearch = { ...dataSearch };
    newSearch[key] = value;
    setDataSearch && setDataSearch(newSearch);
  };

  const HandleSearch = () => {
    if (!oldData || !setOnSearch) {
      let newTravelDate = ''
      if(dataSearch?.travelDate) {
        let month = '00' + dataSearch.travelDate.month
        month = month.slice(month.length-2,month.length)

        let day = '00' + dataSearch.travelDate.day
        day = day.slice(day.length-2,day.length)

        newTravelDate = `${(dataSearch.travelDate.year)}-${month}-${day}`
    }
      localStorage.setItem('dataSearch', JSON.stringify({...dataSearch,newTravelDate}))
      router.push("/customer/list-result-shuttle");
      return;
    }
    console.log("search");
    setOnSearch(onSearch+1);
  };
  return (
    <>
    {cities?.length > 0 &&
      <div className="flex justify-between p-6 bg-[#f3eded] w-[70%] h-[20%] shadow-2xl rounded-md ml-80">
        <div className="flex space-x-4 p-3 border-2 border-gray-400 items-center basis-5/6">
          <Autocomplete
            className="inline-flex"
            placeholder="Nơi xuất phát"
            defaultInputValue={oldData.startPoint}
            value={dataSearch?.startPoint}
            onInputChange={(val) => onChange("startPoint", val)}
          >
            
            {cities.map((animal: any, idx: any) => (
              <AutocompleteItem key={idx} value={animal} className="bg-white">
                {animal}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            className="inline-flex"
            placeholder="Nơi đến"
            defaultInputValue={oldData.endPoint}
            value={dataSearch?.endPoint}
            onInputChange={(val) => onChange("endPoint", val)}
          >
            {cities.map((animal: any, idx: any) => (
              <AutocompleteItem key={idx} value={animal} className="bg-white">
                {animal}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <DatePicker
            label="Ngày"
            value={dataSearch?.travelDate}
            onChange={(event: any) => onChange("travelDate", event)}
          />
        </div>
        <button className="button_search" onClick={HandleSearch}>Tìm kiếm</button>
      </div>
}
    </>
  );
};
export default SearchWidget;
