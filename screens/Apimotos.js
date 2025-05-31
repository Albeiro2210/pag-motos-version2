import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Motorcycles&format=json');

    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
