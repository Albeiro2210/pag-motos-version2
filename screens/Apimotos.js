import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://motorcycle-specs-database.p.rapidapi.com/article/804882',
      {
        headers: {
          'x-rapidapi-key': 'aa155b9a64msh10b9c4acbf2fa56p15e2c9jsn9bbd4ed2ee96',
          'x-rapidapi-host': 'motorcycle-specs-database.p.rapidapi.com',
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return "empty";
};

