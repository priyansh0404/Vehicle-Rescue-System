function SOSList({ sosList }) {
  return (
    <div>
      <h2>SOS Requests</h2>
      {sosList.map((sos) => (
        <div key={sos._id}>
          <p>Lat: {sos.location.lat}</p>
          <p>Lng: {sos.location.lng}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default SOSList;
