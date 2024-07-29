import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  return (
    <Breadcrumb width="32.5cm" backgroundColor="blue.500" padding="1em" borderRadius="md">
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to="/">
          Main Page
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
