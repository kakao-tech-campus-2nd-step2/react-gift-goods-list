import styled from "@emotion/styled";

import Spinner from "@/assets/spinner.gif"

export default () => {
	return (
		<Background>
			<img src={Spinner} alt="loading" />
			<LoadingText>로딩중</LoadingText>
		</Background>
	);
}

export const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background: #ffffffb7;
	z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const LoadingText = styled.div`
	font: 1rem 'Noto Sans KR';
	text-align: center;
`;
