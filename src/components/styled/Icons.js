import React from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg`
  display: block;
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