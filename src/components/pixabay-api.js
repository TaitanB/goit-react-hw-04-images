import { Notify } from 'notiflix';
import axios from 'axios';

export const onFetch = async (SearchQuery, page) => {
  const API_KEY = '33528220-6f12bec756615243821cbd5de';

  try {
    // console.log(`5. Відправляємо запит на api по значенню ${SearchQuery}`);

    const response = await axios.get(
      `https://pixabay.com/api/?q=${SearchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    // console.log(`6. Отримали відповідь: ${response.data.hits}`);
    return response.data.hits;
  } catch (error) {
    // console.log('6.1 Щось пішло не так...');
    Notify.failure('Sorry, something went wrong...', error);
  }
};
