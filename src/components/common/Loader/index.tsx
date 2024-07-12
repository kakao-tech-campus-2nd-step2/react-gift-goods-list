import './index.css';

import { forwardRef } from 'react';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => (
  <div className={props.className} ref={ref} {...props}></div>
));
