import { Flex, useFocusEffect } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import PlaceDetail from '../components/PlaceDetail';
import { getPlacesData } from './api';
import Head from 'next/head';

const Homepage = () => {
	const [places, setplaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [type, setType] = useState('restaurants');
	const [ratings, setRatings] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [bounds, setBounds] = useState(null);
	useEffect(() => {
		// get the users current location on intail login
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				console.log({ latitude, longitude });
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		const filteredData = places.filter((place) => place.rating > ratings);
		setFilteredPlaces(filteredData);
		console.log({ ratings });
	}, [ratings]);

	useEffect(() => {
		setIsLoading(true);
		getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
			console.log(data);
			setplaces(data);
			setIsLoading(false);
		});
	}, [type, coordinates, bounds]);

	return (
		<Flex
			justifycontent={'center'}
			alignitems={'center'}
			width={'100vw'}
			height={'100vh'}
			maxwidth={'100vw'}
			maxheight={'100vh'}
			position={'relative'}
		>
			<Head>
				<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyABXV7PhV1Zyw8MT7sjHC-uH1h_JYEMJTc"></script>
			</Head>

			<Header
				setType={setType}
				setRatings={setRatings}
				setCoordinates={setCoordinates}
			/>

			<List
				places={filteredPlaces.length ? filteredPlaces : places}
				isLoading={isLoading}
			/>

			<Map
				setCoordinates={setCoordinates}
				coordinates={coordinates}
				setBounds={setBounds}
				places={filteredPlaces.length ? filteredPlaces : places}
			/>
		</Flex>
	);
};

export default Homepage;
