import {
  Logo,
  NationGraph,
  NationGrid,
  Scrollable,
  ThemeSelector,
} from "@components";
import "./_styles.scss";

export default function Landing({}) {
  return (
    <div className="wrapper">
      <div className="header">
        <Logo />
        <ThemeSelector />
      </div>
      <div className="body">
        <div className="dashboard">
          <Scrollable className="widget card drop-shadow w-50">
            <NationGrid />
          </Scrollable>
          <Scrollable className="widget framed gutter-left w-50">
            <NationGraph />
          </Scrollable>
        </div>
      </div>
      <div className="footer">
        Developed by
        <a href="https://typedev.io" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 690.44 164.31"
            className="logo"
          >
            <path d="M3.39,105.57c.08-.5,0-.28,0,0Z"></path>
            <path d="M8.64,106.28h0C8.68,105.91,8.71,105.66,8.64,106.28Z"></path>
            <path d="M342.33,104.21c.07-.5,0-.28,0,0Z"></path>
            <path d="M347.57,104.92c-.18-.56-.1-.33,0,0C347.62,104.55,347.65,104.3,347.57,104.92Z"></path>
            <path
              className="cls-1"
              d="M479.7,80.68v-81h16.79q18.18,0,26.38,2.92a35.22,35.22,0,0,1,18.42,14.32q6.65,10.18,6.64,24.28a42.57,42.57,0,0,1-5.26,21.43A33.74,33.74,0,0,1,529,76.28q-8.4,4.39-23.54,4.4ZM487.46,73h9.36q16.8,0,23.3-2.1a26.84,26.84,0,0,0,14.37-10.7q5.24-7.73,5.23-18.9,0-11.71-5.67-20a28.58,28.58,0,0,0-15.8-11.39Q510.64,7.6,493.19,7.6h-5.73Z"
            ></path>
            <path
              className="cls-1"
              d="M563.68-.33H610.1V7.6H571.78V33h38v7.93h-38V72.75h38v7.93h-46.1Z"
            ></path>
            <path
              className="cls-1"
              d="M617.78-.33h8.81l26.85,62.59L680.73-.33h8.81l-35.25,81h-1.76Z"
            ></path>
            <path
              className="cls-2"
              d="M62.79-.36V4.36q-13.11.18-17.92,5.18t-4.8,19.55V42.43q0,20.84-5.64,28.45T13.55,81.35q15.26,2.84,20.88,10.38t5.64,28.21v13.2q0,14.43,4.76,19.27t18,5v4.71h-.92q-20.05,0-27.53-6.78t-7.48-25.18V110.55q0-14.61-5.46-20.17T.9,83.63V78.91Q16.14,77.52,21.5,72t5.36-20.16V32q0-18.63,7.48-25.49T61.87-.36Z"
            ></path>
            <path
              className="cls-2"
              d="M95.22,44.27,94,93.13v4.05q0,10.89,2.57,14.75t9,3.88a12.49,12.49,0,0,0,7.56-2.3,17.24,17.24,0,0,0,5.31-7.15l3.69,1.53a23.38,23.38,0,0,1-23.58,17.45q-10.26,0-14.8-5.49T79.2,101.59V99.07l1.44-54.8H70.93V40.4a32.85,32.85,0,0,0,13.36-11,37.54,37.54,0,0,0,6.16-17h5.49l-.72,26.91h22.32v5Z"
            ></path>
            <path
              className="cls-2"
              d="M166,121.92l-28-68a1.7,1.7,0,0,0-.18-.44q-4.59-11.07-13.86-12.51V35.81q4.32.36,8.86.54c3,.12,6.29.18,9.76.18s6.86-.06,9.95-.18,6-.3,8.86-.54v5.13h-.9a15.34,15.34,0,0,0-6.57,1.17c-1.62.78-2.43,1.83-2.43,3.14a20.53,20.53,0,0,0,1.71,7.29,9.4,9.4,0,0,1,.45,1.17l19.17,49.05q2.07-5.94,5.76-16.29Q190.7,51.91,190.7,47.24a4.76,4.76,0,0,0-2.88-4.46q-2.88-1.48-9.09-1.84V35.81q3.42.36,7.11.54t7.83.18c2.75,0,5.32-.06,7.69-.18s4.64-.3,6.79-.54v5.13a10.27,10.27,0,0,0-7,2.29q-2.61,2.3-4.58,7.87L168.2,131.82q-6.75,19.44-12.42,26.14a17.77,17.77,0,0,1-14.13,6.71,11.52,11.52,0,0,1-7.1-2,6.2,6.2,0,0,1-2.7-5.17,6.76,6.76,0,0,1,2-5.13,7.23,7.23,0,0,1,5.22-1.89,12.77,12.77,0,0,1,5.75,1.44,22.11,22.11,0,0,1,5.67,4.23q3.51-2.34,7.38-10.89A176.87,176.87,0,0,0,166,121.92Z"
            ></path>
            <path
              className="cls-2"
              d="M241.18,145.5q0,8.46,2.25,10.17T257,157.83V163q-6.3-.45-12-.68t-10.89-.22q-4.95,0-10.48.22t-11.75.68v-5.13q10.44-.9,12.6-2.66t2.16-9.67v-92q0-7.45-2.52-9.35t-12.78-1.89V37.07q7.47-.45,14.76-1.17t14.67-1.71v16.2a36.28,36.28,0,0,1,12.37-12.2,32,32,0,0,1,16.07-4,30.59,30.59,0,0,1,25.06,12q9.58,12,9.58,31.49,0,20.25-9.67,32.44t-25.6,12.19a33.73,33.73,0,0,1-15.3-3.42,35.5,35.5,0,0,1-12.15-10.25Zm0-85.94V98.89a34,34,0,0,0,10.15,12.46,21.7,21.7,0,0,0,13,4.46q11.23,0,17.29-10.49t6.06-30.1q0-16.38-5.88-25.51t-16.48-9.13a20.61,20.61,0,0,0-13.07,4.63Q246.39,49.85,241.18,59.56Z"
            ></path>
            <path
              className="cls-2"
              d="M334.59,76.21v4.05q0,18.09,7.29,27.27t21.68,9.17a29.35,29.35,0,0,0,17-4.94,29.74,29.74,0,0,0,10.8-14.22l3.87,1.53q-3.87,13.05-13.55,20T357.44,126q-18.54,0-28.88-11.83t-10.35-33q0-21.78,11.25-34.64t30.23-12.87q16.74,0,26.14,9.85T395.24,71q0,.54-.09,1.8t-.09,1.89Zm0-5,46.61-1.8V67.84q0-14.4-5.27-21.82T360.41,38.6q-11.79,0-18.45,8.46T334.59,71.17Z"
            ></path>
            <path
              className="cls-2"
              d="M404.27.08h.92q20,0,27.49,6.9t7.53,25.44V52.29q0,14.66,5.36,20.16t20.6,6.9v4.71q-15.06,1.22-20.51,6.76T440.21,111v19.64q0,18.28-7.53,25.13t-27.49,6.83h-.92v-4.71q13.22-.18,18-5T427,133.58V120.37q0-20.66,5.63-28.21t20.88-10.38q-15.24-2.85-20.88-10.46T427,42.87V29.52Q427,15,422.19,10T404.27,4.8Z"
            ></path>
          </svg>
        </a>
        &copy; 2022
      </div>
    </div>
  );
}
