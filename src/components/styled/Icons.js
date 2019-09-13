import React from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg`
  display: inline-block;
  width: ${({ width }) => width ? width : '1.6rem'};

  .primary{
    fill: ${({ primary }) => primary ? primary : 'var(--color-neutral-8)'};
  }

  .secondary {
    fill: ${({ secondary }) => secondary ? secondary : 'var(--color-neutral-4)'};
  }
`;

export const IconUser = (props) => (<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-user" {...props}><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" /><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z" /></SVG>);

export const IconAttach = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-attach"><path className="secondary" d="M20.12 11.95l-6.58 6.59a5 5 0 1 1-7.08-7.07l6.59-6.6a3 3 0 0 1 4.24 4.25l-6.58 6.59a1 1 0 1 1-1.42-1.42l6.59-6.58a1 1 0 0 0-1.42-1.42l-6.58 6.59a3 3 0 0 0 4.24 4.24l6.59-6.58a5 5 0 0 0-7.08-7.08l-6.58 6.6a7 7 0 0 0 9.9 9.9l6.59-6.6a1 1 0 0 0-1.42-1.4z" /></SVG>)

export const iconLaunch = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-launch"><g><path className="primary" d="M14.57 6.96a2 2 0 0 1 2.47 2.47c.29.17.5.47.5.86v7.07a1 1 0 0 1-.3.71L13 22.31a1 1 0 0 1-1.7-.7v-3.58l-.49.19a1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16l.19-.48H2.39A1 1 0 0 1 1.7 11l4.24-4.24a1 1 0 0 1 .7-.3h7.08c.39 0 .7.21.86.5zM13.19 9.4l-2.15 2.15a3 3 0 0 1 .84.57 3 3 0 0 1 .57.84l2.15-2.15A2 2 0 0 1 13.2 9.4zm6.98-6.61a1 1 0 0 1 1.04 1.04c-.03.86-.13 1.71-.3 2.55-.47-.6-1.99-.19-2.55-.74-.55-.56-.14-2.08-.74-2.55.84-.17 1.7-.27 2.55-.3z" /><path className="secondary" d="M7.23 10.26A16.05 16.05 0 0 1 17.62 3.1a19.2 19.2 0 0 1 3.29 3.29 15.94 15.94 0 0 1-7.17 10.4 19.05 19.05 0 0 0-6.51-6.52zm-.86 5.5a16.2 16.2 0 0 1 1.87 1.87 1 1 0 0 1-.47 1.6c-.79.25-1.6.42-2.4.54a1 1 0 0 1-1.14-1.13c.12-.82.3-1.62.53-2.41a1 1 0 0 1 1.6-.47zm7.34-5.47a2 2 0 1 0 2.83-2.83 2 2 0 0 0-2.83 2.83z" /></g></SVG>)

export const iconMail = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-mail"><path className="primary" d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z" /><path className="secondary" d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z" /></SVG>)

export const IconSortAscending = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-sort-ascending"><path className="secondary" d="M18 13v7a1 1 0 0 1-2 0v-7h-3a1 1 0 0 1-.7-1.7l4-4a1 1 0 0 1 1.4 0l4 4A1 1 0 0 1 21 13h-3z" /><path className="primary" d="M3 3h13a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h9a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h5a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z" /></SVG>)

export const IconSortDescending = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-sort-decending"><path className="secondary" d="M6 11V4a1 1 0 1 1 2 0v7h3a1 1 0 0 1 .7 1.7l-4 4a1 1 0 0 1-1.4 0l-4-4A1 1 0 0 1 3 11h3z" /><path className="primary" d="M21 21H8a1 1 0 0 1 0-2h13a1 1 0 0 1 0 2zm0-4h-9a1 1 0 0 1 0-2h9a1 1 0 0 1 0 2zm0-4h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2z" /></SVG>)

export const IconTrash = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-trash"><path className="primary" d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z" /><path className="secondary" d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z" /></SVG>)

export const IconCheck = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="primary" d="M10,14.07l6.3-6.3a1,1,0,0,1,1.41.11,1,1,0,0,1,0,1.31l-7,7a1,1,0,0,1-1.4,0l-3-3a1,1,0,0,1,.1-1.42,1,1,0,0,1,1.3,0Z" /></SVG>)

export const IconCheckPlus = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="primary" d="M21.48,11c.39,0,.7.45.7,1s-.31,1-.7,1H14.42c-.39,0-.71-.45-.71-1s.32-1,.71-1Z" /><path className="primary" d="M19,15.53c0,.39-.45.71-1,.71s-1-.32-1-.71V8.47c0-.39.44-.71,1-.71s1,.32,1,.71Z" /><path className="primary" d="M5.76,14.07l6.3-6.3a1,1,0,0,1,1.4,1.42l-7,7a1,1,0,0,1-1.4,0l-3-3a1,1,0,0,1,.1-1.42,1,1,0,0,1,1.3,0Z" /></SVG>)

export const IconCheckMinus = (props) => (<SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className='primary' d="M5.76,14.07l6.3-6.3a1,1,0,0,1,1.4,1.42l-7,7a1,1,0,0,1-1.4,0l-3-3a1,1,0,0,1,.1-1.42,1,1,0,0,1,1.3,0Z" /><path className="primary" d="M21.48,11c.39,0,.7.45.7,1s-.31,1-.7,1H14.42c-.39,0-.71-.45-.71-1s.32-1,.71-1Z" /></SVG>)

export const IconInformation = ({ primary = 'var(--color-secondary-4)', secondary = 'var(--color-secondary-2)', ...props }) => (<SVG primary={primary} secondary={secondary} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-information"><path className="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" /><path className="secondary" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /></SVG>)

export const IconError = ({ primary = 'var(--color-red-4)', secondary = 'var(--color-red-2)', ...props }) => (<SVG primary={primary} secondary={secondary} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-important"><path className="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" /><path className="secondary" d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z" /></SVG>)

export const IconSuccess = ({ primary = 'var(--color-blue-4)', secondary = 'var(--color-blue-2)', ...props }) => (<SVG primary={primary} secondary={secondary} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-check"><circle cx="12" cy="12" r="10" className="primary" /><path className="secondary" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></SVG>)

export const AppLogo = ({ primary = 'var(--color-secondary-5)', ...props }) => (<SVG primary={primary} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path className="primary" d="M371.07,201.08a170.41,170.41,0,0,1-43.52,114c-.61-19.76-1.05-41.68-1.76-47.87-.93-7.92-1.25-16.49,3.41-23.48a26.16,26.16,0,0,0,3.06-6.54c.77-2.35,1.42-4.73,2-7.13a60.72,60.72,0,0,0,1.45-6.49c.27-2,.73-3.95,1.15-5.89a44.79,44.79,0,0,1,3.18-9c1.34-2.9,1.91-6.06,3.09-9a20.08,20.08,0,0,0,1.44-4.77,10,10,0,0,0-.13-4.07,3,3,0,0,0-2.22-2.44,3.1,3.1,0,0,0-3.3,1.35,9.37,9.37,0,0,0-1.14,2,28.21,28.21,0,0,0-1.59,4.89,9,9,0,0,1-1.27,3.21,38.43,38.43,0,0,0-2.81,5.54c-.4.87-.76,1.77-1.17,2.63-.19.44-.36,1-1.1,1a11.78,11.78,0,0,1,.66-4.2c1.09-3.72,2.72-7.26,3.86-11,1.82-5.94,3.37-12,5-18a9.34,9.34,0,0,0,.21-3.16A4.31,4.31,0,0,0,337,169a3.24,3.24,0,0,0-4.57,1.57c-.46,1-.81,2.07-1.18,3.12-1.22,3.58-2.08,7.29-3.76,10.7-2.39,4.87-4.65,9.78-5.69,15.13-.07.38-.12.83-.61,1a2,2,0,0,1,0-1.33A83.82,83.82,0,0,1,324.71,186a39.42,39.42,0,0,0,1.81-6.72c.22-1.37.47-2.74.78-4.09.46-2,1.15-4,1.71-6s1.41-3.82,1.28-5.86a5.85,5.85,0,0,0-.35-1.72,3.3,3.3,0,0,0-.39-.8,3.08,3.08,0,0,0-.95-.81,5,5,0,0,0-3.54-.51,4.34,4.34,0,0,0-2.74,2.2,30,30,0,0,0-3.15,6.87,46.88,46.88,0,0,1-1.73,4.69c-.94,2.23-2.21,4.33-2.83,6.68-1,3.71-2,7.43-2.95,11.14a21.78,21.78,0,0,1-2.38,6.35c-.17.31-.29.67-.77.57a1.06,1.06,0,0,1-.05-1c1.25-4.18,1.39-8.55,2-12.84.33-2.45.4-5,1.28-7.3a45.4,45.4,0,0,0,1.33-6,5.6,5.6,0,0,0-.1-2.57,3.26,3.26,0,0,0-2.88-2.69A3.91,3.91,0,0,0,306.3,167a17.55,17.55,0,0,0-3.93,8.58,7.42,7.42,0,0,1-.56,2,53.86,53.86,0,0,0-3.4,10.5c-.66,2.85-1.17,5.74-1.83,8.6-1,4.28-2.34,8.48-3.46,12.71a27.27,27.27,0,0,1-3.33,6.76c-.09.18-.26.31-.67.34a34.54,34.54,0,0,0-1.34-3.57,16.81,16.81,0,0,0-2.64-5.39,2.54,2.54,0,0,1-.44-1.14c-1.19-4.35-4.78-9.21-9.29-10.63a3.56,3.56,0,0,0-4.15,1.27,4,4,0,0,0,.29,3.78c.63,1.17,1.54,2.16,2.13,3.35A18.82,18.82,0,0,1,275,209a79.84,79.84,0,0,0,4.09,13.07,3.26,3.26,0,0,1,.14.9c.26,2.57.57,5.13,2,7.35a4.46,4.46,0,0,1,.48,1.12c.91,3.14,2.36,6,3.54,9a19,19,0,0,0,4.4,7,6,6,0,0,1,1.95,3.53,269.66,269.66,0,0,1,1.44,28.76c.12,5.88,1.17,48.49.92,64.29a170.43,170.43,0,0,1-52.67,23.09c-2.91-20.3-3.76-46-5.94-64.9-1.81-15.58-2.45-32.47,6.73-46.23a52.29,52.29,0,0,0,6-12.87c1.5-4.65,2.76-9.32,3.94-14A118.33,118.33,0,0,0,255,216.3c.52-3.92,1.43-7.75,2.27-11.6A88.88,88.88,0,0,1,263.48,187c2.63-5.7,3.78-11.92,6.09-17.75a40.44,40.44,0,0,0,2.82-9.4,20,20,0,0,0-.24-8c-.62-2.33-1.86-4.26-4.36-4.82-2.73-.63-4.87.53-6.5,2.66a17.91,17.91,0,0,0-2.24,3.87,55.67,55.67,0,0,0-3.15,9.61,17.68,17.68,0,0,1-2.52,6.37,75.64,75.64,0,0,0-5.51,10.89c-.77,1.72-1.51,3.46-2.31,5.18-.39.84-.7,1.89-2.17,1.89a23.67,23.67,0,0,1,1.29-8.26c2.17-7.33,5.39-14.28,7.62-21.62,3.57-11.71,6.65-23.55,9.78-35.37a17.52,17.52,0,0,0,.42-6.21,8.45,8.45,0,0,0-5.13-7.16c-3-1.33-7.12-1.23-9,3.06-.91,2-1.61,4.1-2.31,6.16-2.42,7.06-4.13,14.37-7.41,21.07-4.72,9.58-9.15,19.26-11.22,29.81-.14.72-.21,1.61-1.18,1.89a3.73,3.73,0,0,1-.07-2.63,164.08,164.08,0,0,1,7.1-25.83,78.11,78.11,0,0,0,3.55-13.2c.45-2.7.94-5.4,1.54-8.08.91-4,2.26-7.86,3.35-11.79,1-3.77,2.77-7.52,2.55-11.54a12.32,12.32,0,0,0-.7-3.4,6.06,6.06,0,0,0-.77-1.55,6,6,0,0,0-1.89-1.61,9.71,9.71,0,0,0-7-1c-2.5.57-4.08,2.17-5.41,4.32a60.16,60.16,0,0,0-6.19,13.53,90.09,90.09,0,0,1-3.42,9.22c-1.85,4.41-4.33,8.52-5.56,13.18q-2.94,10.95-5.79,21.9c-1.12,4.34-2.28,8.66-4.68,12.51-.35.6-.61,1.33-1.54,1.12a2.1,2.1,0,0,1-.1-2c2.48-8.25,2.75-16.84,3.94-25.3.66-4.82.8-9.75,2.52-14.36,1.4-3.88,1.82-7.93,2.62-11.91a11.44,11.44,0,0,0-.17-5.07,6.43,6.43,0,0,0-5.71-5.29A7.61,7.61,0,0,0,197,105a34.45,34.45,0,0,0-7.75,16.87,14.49,14.49,0,0,1-1.09,4,105.75,105.75,0,0,0-6.7,20.65c-1.3,5.62-2.31,11.33-3.61,17-1.92,8.42-4.6,16.66-6.81,25-1.33,4.92-4,9.05-6.54,13.31-.21.35-.51.59-1.32.66-.56-2.41-1.78-4.64-2.66-7-1.36-3.74-2.55-7.54-5.21-10.62a5.33,5.33,0,0,1-.84-2.24c-2.33-8.57-9.42-18.13-18.28-20.93-2.94-.92-6.64-.19-8.17,2.48-1.3,2.27-.67,5.16.56,7.47s3,4.25,4.2,6.58c1.48,2.93,1.93,6.26,2.57,9.48a157.06,157.06,0,0,0,8.06,25.74,6.27,6.27,0,0,1,.26,1.75c.54,5.06,1.12,10.1,4,14.5a9.18,9.18,0,0,1,.94,2.2c1.79,6.16,4.65,11.85,7,17.79a38.28,38.28,0,0,0,8.68,13.77,11.77,11.77,0,0,1,3.84,6.95A527.72,527.72,0,0,1,171,326.94c.26,11.42,2.25,29.78,1.83,43.05a169.62,169.62,0,0,1-62-22.94c.26-5.8,1-11.81,1.12-17.3a341.91,341.91,0,0,1,1.85-36.7,7.6,7.6,0,0,1,2.49-4.5,25,25,0,0,0,5.61-8.93c1.5-3.86,3.36-7.54,4.52-11.52a5.54,5.54,0,0,1,.6-1.43c1.89-2.87,2.27-6.13,2.62-9.41a4,4,0,0,1,.18-1.12,101.33,101.33,0,0,0,5.2-16.71,24.82,24.82,0,0,1,1.68-6.14c.76-1.49,1.92-2.78,2.71-4.26a5.09,5.09,0,0,0,.38-4.84c-1-1.74-3.4-2.21-5.3-1.61-5.74,1.82-10.34,8-11.86,13.57a3.26,3.26,0,0,1-.55,1.45c-1.72,2-2.49,4.46-3.37,6.88a40.23,40.23,0,0,0-1.72,4.57c-.52-.06-.73-.21-.87-.44-1.62-2.77-3.37-5.44-4.22-8.63-1.43-5.41-3.18-10.76-4.42-16.21-.84-3.65-1.5-7.35-2.34-11a67.57,67.57,0,0,0-4.35-13.39,9.16,9.16,0,0,1-.7-2.57,22.22,22.22,0,0,0-5-10.94A4.94,4.94,0,0,0,90.17,184a4.17,4.17,0,0,0-3.69,3.43,7.06,7.06,0,0,0-.11,3.29,53.23,53.23,0,0,0,1.69,7.72c1.11,3,1.2,6.18,1.64,9.3.77,5.49,1,11.07,2.56,16.41a1.41,1.41,0,0,1-.07,1.29c-.62.14-.77-.34-1-.73a27.73,27.73,0,0,1-3-8.1c-1.23-4.74-2.51-9.47-3.76-14.21-.8-3-2.41-5.68-3.61-8.53a59.59,59.59,0,0,1-2.21-6,38.57,38.57,0,0,0-4-8.76,5.47,5.47,0,0,0-3.51-2.81,6.24,6.24,0,0,0-4.5.64,3.73,3.73,0,0,0-1.22,1,4,4,0,0,0-.5,1,7.56,7.56,0,0,0-.45,2.21c-.16,2.6,1,5,1.63,7.48s1.6,5,2.19,7.64c.39,1.73.71,3.48,1,5.23a50.74,50.74,0,0,0,2.31,8.56,106.75,106.75,0,0,1,4.6,16.75,2.46,2.46,0,0,1,0,1.69c-.65-.17-.69-.74-.77-1.22C74,220.52,71.08,214.24,68,208c-2.12-4.35-3.24-9.09-4.79-13.66-.46-1.33-.91-2.68-1.5-4-1.23-2.78-3.92-2.85-5.85-2a5.52,5.52,0,0,0-3.33,4.65,11.4,11.4,0,0,0,.27,4c2,7.65,4,15.33,6.35,22.92,1.44,4.76,3.53,9.26,4.94,14a15.1,15.1,0,0,1,.84,5.34c-.95,0-1.16-.67-1.42-1.21-.51-1.12-1-2.24-1.49-3.36a47.68,47.68,0,0,0-3.57-7.06,11.73,11.73,0,0,1-1.64-4.13,34.65,34.65,0,0,0-2-6.23,11.13,11.13,0,0,0-1.44-2.51,3.93,3.93,0,0,0-4.21-1.72,3.83,3.83,0,0,0-2.84,3.13,12.68,12.68,0,0,0-.15,5.17,25.13,25.13,0,0,0,1.83,6.1c1.5,3.78,2.24,7.82,3.94,11.52A57.34,57.34,0,0,1,56,250.51c.53,2.49,1.12,5,1.47,7.53a72.64,72.64,0,0,0,1.86,8.28c.77,3.06,1.58,6.1,2.56,9.11a33.23,33.23,0,0,0,3.92,8.34c5.72,8.58,5.55,19,4.49,28.81a171.07,171.07,0,1,1,300.8-111.5Z" /></SVG>)