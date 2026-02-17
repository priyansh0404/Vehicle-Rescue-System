export const fetchSOS = async () => {
  const response = await fetch("http://localhost:5000/api/sos");
  return response.json();
};
