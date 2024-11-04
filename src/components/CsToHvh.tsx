import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const CsToHvh = () => {

  const [steam, setsteam] = useState([]);

  const fetchData = async () => {
    let url = "https://api.cs2hvh.com/";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    console.log(parsedData.steam);
    //console.log(parsedData.steam[1]);
    //console.log(parsedData.steam.length);
    setsteam(parsedData.steam);
  };

  useEffect(() => {
    fetchData();
    const refresh = setInterval(fetchData,60000);
    return () => {
      clearInterval(refresh);
      console.log("refreshed")
    }
  }, []);

  const sortByPlayers = [...steam].sort((a,b)=>b.players-a.players);
  return (
    <div className="container">
      <h1 className="text-5xl text-center mb-5 mt-7">cs2hvh.com</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Address</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Map</TableHead>
              <TableHead className="text-right">Players</TableHead>
              <TableHead className="text-right">Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortByPlayers.map((element,index) => {
              return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {element.addr}
                    </TableCell>
                    <TableCell>{element.name}</TableCell>
                    <TableCell>{element.map}</TableCell>
                    <TableCell className="text-right">
                      {element.players}
                    </TableCell>
                    <TableCell className="text-right">
                      {element.country}
                    </TableCell>
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CsToHvh;
