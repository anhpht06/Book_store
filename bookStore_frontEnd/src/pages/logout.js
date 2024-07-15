export default function Logout() {
  return (
    <main>
      <div className="text-center">
        <text>Bạn có muốn đăng xuất không ?</text>

        <div className="mt-4">
          <button className="  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=>{
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          >
            Đăng xuất
          </button>
          <label> </label>
          <button className=" justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => window.location.href = "/"}>
            Không
          </button>
        </div>
      </div>
    </main>
  );
}
