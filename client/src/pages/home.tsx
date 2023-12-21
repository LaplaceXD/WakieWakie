import Clock from "@/components/clock";

function Home() {
  return (
    <div className="bg-neutral-100 w-screen">
      <div id="clock-container">
          <Clock />
      </div>
      <div id="card-container">
        <h1>It's time to Wakie Wakie!</h1>
        <p>You woke up with this people</p>
        <div id="card"></div>
      </div>
    </div>
  );
}

export default Home;
