import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

const BookTour = () => {
  const [bookings, setBookings] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    axios
      .get("https://ph-assignment12-server.vercel.app/bookings", { withCredentials: true })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refetch]);

  const cancelBooking = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will not be able to recover this booking!",
      icon: "warning",
      button: "Yes, cancel it!",
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        axios
          .delete(`https://ph-assignment12-server.vercel.app/cancelBooking/${id}`, {
            withCredentials: true,
          })
          .then(() => {
            swal("Booking has been cancelled!", {
              icon: "info",
            });
            setRefetch(!refetch);
          })
          .catch((err) => {
            console.log(err);
            swal("Failed to cancel booking!", {
              icon: "error",
            });
          });
      } else {
        swal("Booking is safe!");
      }
    });
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentItems = bookings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(bookings.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let count2 = offset + 1;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package</th>
              <th>Tour Guide</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItems.map((booking) => (
              <tr key={booking._id}>
                <td>{count2++}</td>
                <td>{booking.packageName}</td>
                <td>{booking.guideName}</td>
                <td>{booking.startDate.slice(0, 10)}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    className="bg-flamingo disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-100 hover:text-flamingo text-white font-medium py-1 px-2 rounded"
                    disabled={booking.status === "In Review" ? false : true}
                    onClick={() => {
                      cancelBooking(booking._id);
                    }}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="bg-genoa disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-light-green-400 text-white font-medium py-1 px-2 rounded"
                    disabled={booking.status === "Accepted" ? false : true}
                  >
                    Pay Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
      </div>
    </div>
  );
};

export default BookTour;
