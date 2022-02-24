import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	BaseLayout,
	StepFour,
	StepOne,
	StepThree,
	StepTwo,
} from 'src/Components';
import { RootState } from 'src/store/reducer';

const Home: FC = () => {
	const { step }: any = useParams();
	const formDataState = useSelector<RootState, IFromData>(
		(state) => state.formData
	);
	return (
		<BaseLayout>
			<>
				{(!step || step === 'one') && <StepOne formDataState={formDataState} />}
				{step === 'two' && <StepTwo formDataState={formDataState} />}
				{step === 'three' && <StepThree formDataState={formDataState} />}
				{step === 'four' && <StepFour formDataState={formDataState} />}
			</>
		</BaseLayout>
	);
};

export default Home;
