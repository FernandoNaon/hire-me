/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

interface Child {
  childId: string;
  checkedIn: boolean;
  image: { small: string };
  name: { fullName: string };
}

const accessToken: string = import.meta.env.VITE_API_KEY || '';

function App(): JSX.Element {
  const [children, setChildren] = useState<Child[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageQty, setPageQty] = useState<number>(1);
  const childrenPerPage: number = 5;

  useEffect(() => {
    getChildren();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getChildren = async () => {
    try {
      const response = await axios.get(
        `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=86413ecf-01a1-44da-ba73-1aeda212a196&institutionId=dc4bd858-9e9c-4df7-9386-0d91e42280eb`
      );
      console.log(response.data)
      const totalChildren: number = response.data.children.length;
      const totalPages: number = Math.ceil(totalChildren / childrenPerPage);
      setPageQty(totalPages);

      const startIndex: number = (currentPage - 1) * childrenPerPage;
      const endIndex: number = currentPage * childrenPerPage;
      const slicedChildren: Child[] = response.data.children.slice(startIndex, endIndex);
      setChildren(slicedChildren);
    } catch (error) {
      console.error(error);
    }
  };

  const checkInChild = async (childId: string) => {
    const pickupTime: string = getCurrentTimeFormatted();
    try {
      const response = await axios.post(
        `https://app.famly.co/api/v2/children/${childId}/checkins`,
        {
          accessToken: accessToken,
          pickupTime: pickupTime,
        }
      );
      console.log("Child checked in successfully:", response.data);
      getChildren();
    } catch (error) {
      console.error("Error checking in child:", error);
    }
  };

  const checkOutChild = async (childId: string) => {
    try {
      const response = await axios.post(
        `https://app.famly.co/api/v2/children/${childId}/checkout`,
        {
          accessToken: accessToken,
        }
      );
      console.log("Child checked out successfully:", response.data);
      getChildren();
    } catch (error) {
      console.error("Error checking in child:", error);
    }
  };

  const getCurrentTimeFormatted = (): string => {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: string = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day: string = String(currentDate.getDate()).padStart(2, "0");
    const hours: string = String(currentDate.getHours()).padStart(2, "0");
    const minutes: string = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds: string = String(currentDate.getSeconds()).padStart(2, "0");
    const timezoneOffset: number = currentDate.getTimezoneOffset();

    const formattedDate: string = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${
      timezoneOffset >= 0 ? "-" : "+"
    }${Math.abs(Math.floor(timezoneOffset / 60))
      .toString()
      .padStart(2, "0")}:${(Math.abs(timezoneOffset) % 60)
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    <div>
      <h1 className="title">famly app</h1>
      <div className="card-container">
        {children.map((child: Child, i: number) => {
          return (
            <div key={i} className="card">
              {child.checkedIn === true ? (
                <p className="badge">Checked-in</p>
              ) : null}
              <img src={child.image.small} alt="" />
              <h3>{child.name.fullName}</h3>
              <div className="btn-container">
                {!child.checkedIn ? (
                  <button onClick={() => checkInChild(child.childId)}>
                    Check in
                  </button>
                ) : (
                  <button onClick={() => checkOutChild(child.childId)}>
                    check out
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <p>{currentPage} of {pageQty}</p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === 6}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(pageQty)}
          disabled={currentPage === 6}
        >
          last
        </button>
      </div>
    </div>
  );
}

export default App;
