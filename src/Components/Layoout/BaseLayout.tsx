import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
interface ILayoutProps {
	children: React.ReactElement | React.ReactElement[];
}
const BaseLayout = ({ children }: ILayoutProps) => {
	const formDataState = useSelector<RootState, IFromData>(
		(state) => state.formData
	);
	return (
		<div className="container-fluid">
			<div className="main-content">
				<div className="card is-border-radius-lg">
					<div className="card-body is-border-radius-lg main-color--home-page min-height-90vh p-3">
						<div className="row">
							<div className="car-image">
								<img src="/Images/car-green.svg" alt="" />
							</div>
							<div className="col-12">
								<div className="d-flex justify-content-between align-items-center mt-3 mx-md-5">
									<div className="icon-right-home"></div>
									<p className="font-14 font-weight-600 d-none d-md-block">
										سامانه خرید و مقایسه آنلاین بیمه
									</p>
									{formDataState.name ? (
										<div className="d-flex justify-content-center align-items-center">
											<div className="icon-user">
												<img src="/Images/user.svg" alt="place" />
											</div>
											<p className="font-12 font-weight-bold">
												{formDataState.name} {formDataState.family}
											</p>
										</div>
									) : (
										<p className="font-12 font-weight-600">ثبت نام</p>
									)}
								</div>
								<div className="col-12">
									<div className="row">
										<div className="col-md-4 col-12 parent-from">
											{children}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(BaseLayout);
