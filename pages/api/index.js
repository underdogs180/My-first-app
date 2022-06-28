import axios from 'axios';

const url =
	'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
export const getPlacesData = async (type, sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					tr_latitude: ne.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
				},
				headers: {
					'X-RapidAPI-Key':
						'd38522e2b3msh9091157c535bdf6p1c6a21jsnd6b689241f8e',
					'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
				},
			}
		);
		return data;
	} catch (error) {
		console.log('Fetch data Error : ${error}');
	}
};
