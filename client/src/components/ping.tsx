import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";

const PING = gql(`
  query Ping {
    ping
  }
`);

function Ping() {
  const { loading, error, data } = useQuery(PING);

  if (loading) return "loading...";
  if (error) {
    return (
      <div>
        "ERROR!"<pre>{JSON.stringify(error, null, 4)}</pre>
      </div>
    );
  }

  return <div>{data!.ping}</div>;
}

export default Ping;
