import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { Link as ReactRouterDomLink, LinkProps as ReactRouterDomLinkProps } from 'react-router-dom';
import { PropsWithChildren } from 'react';


type CombinedLinkProps = PropsWithChildren<MuiLinkProps & ReactRouterDomLinkProps>;

const Link: React.FC<CombinedLinkProps> = (props) => {
    const { to, children, ...rest } = props;

    return (
        <MuiLink component={ReactRouterDomLink} to={to} {...rest}>
            {children}
        </MuiLink>
    );
};


export default Link;