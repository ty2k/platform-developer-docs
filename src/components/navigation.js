import React, { useState } from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import SearchBar from "./search-bar";

import SvgChevonDown from "../images/fa-chevron-down-solid.svg";
import SvgChevronUp from "../images/fa-chevron-up-solid.svg";
import SvgOpenMenu from "../images/fa-bars-solid.svg";
import SvgCloseMenu from "../images/fa-xmark-solid.svg";

const StyledListItem = styled.li`
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    span.category-title {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      margin-top: 8px;
      padding: 0;
    }

    button {
      background-color: white;
      border: none;
      cursor: pointer;
      height: 44px;
      margin-right: -15px;
      min-width: 44px;

      &:focus {
        background-color: #fcba19;
        box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c;
        outline: none;
      }

      svg {
        width: 20px;
      }
    }
  }

  ul {
    margin: 8px 0;
    list-style: none;

    li {
      margin: 0;

      a {
        display: block;
        font-size: 16px;
        padding: 8px 0;
        text-decoration: none;

        &.active {
          background-color: #f3f2f1;
          border-color: #003366;
          border-left: 5px solid;
          margin: 0 -15px;
          padding: 8px 15px 8px 10px;
        }

        &:focus,
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const NavListItem = ({ id, links, title }) => {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isContainingCurrentPage = links.some(link =>
    path.includes(link.frontmatter.slug)
  );
  const [isOpen, setIsOpen] = useState(isContainingCurrentPage);

  return (
    <StyledListItem>
      <div>
        <span className="category-title">{title}</span>
        <button
          aria-controls={id}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <SvgChevronUp /> : <SvgChevonDown />}
        </button>
      </div>
      <ul id={id} style={{ display: `${isOpen ? "inherit" : "none"}` }}>
        {links.map((page, index) => {
          return (
            <li key={`link-${index}`}>
              <Link
                to={`/${page?.frontmatter?.slug}`}
                activeClassName={"active"}
              >
                {page?.frontmatter?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </StyledListItem>
  );
};

const MenuButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f2f1;
  border: none;
  border-bottom: 1px solid #b1b4b6;
  box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
  color: #313132;
  cursor: pointer;
  font-size: 14px;
  padding: 0 15px 0 25px;
  height: 44px;
  width: 100%;

  &:focus,
  &:hover {
    background-color: #e6e4e3;
  }
  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 20px;
  }
`;

const StyledDiv = styled.div`
  background-color: white;
  border-right: 1px solid #b1b4b6;
  padding: 20px 25px;
  width: 350px;
  min-width: 350px;

  // On small screens, nav menu fills page width
  @media (max-width: 767.98px) {
    border-right: none;
    border-bottom: 1px solid #b1b4b6;
    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    min-width: 100%;
  }

  nav > ul {
    list-style: none;
    margin: 0;
  }
`;

export default function Navigation() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767.98px)" });
  const [isOpen, setIsOpen] = useState(!isSmallScreen);

  return (
    <>
      {isSmallScreen && (
        <MenuButton
          aria-controls="nav-menu"
          aria-expanded={isOpen ? true : false}
          aria-label={
            isOpen ? "Collapse navigation menu" : "Expand navigation menu"
          }
          className="nav-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Navigation menu</span>
          {isOpen ? <SvgCloseMenu /> : <SvgOpenMenu />}
        </MenuButton>
      )}

      {isOpen && (
        <StyledDiv>
          <SearchBar />

          <StaticQuery
            query={graphql`
              query DocsQuery {
                allMarkdownRemark {
                  nodes {
                    frontmatter {
                      slug
                      title
                    }
                    parent {
                      ... on File {
                        relativeDirectory
                      }
                    }
                  }
                }
              }
            `}
            render={data => {
              let appMonitoring = [];
              let automationAndResiliency = [];
              let buildDeployAndMaintainApps = [];
              let designSystem = [];
              let openshiftProjectsAndAccess = [];
              let platformArchitectureReference = [];
              let reusableCodeAndServices = [];
              let trainingAndLearning = [];
              let useGithubInBcgov = [];
              let noCategory = [];

              data.allMarkdownRemark.nodes.forEach(node => {
                const dir = node.parent.relativeDirectory;

                switch (dir) {
                  case "app-monitoring":
                    appMonitoring.push(node);
                    break;
                  case "automation-and-resiliency":
                    automationAndResiliency.push(node);
                    break;
                  case "build-deploy-and-maintain-apps":
                    buildDeployAndMaintainApps.push(node);
                    break;
                  case "design-system":
                    designSystem.push(node);
                    break;
                  case "openshift-projects-and-access":
                    openshiftProjectsAndAccess.push(node);
                    break;
                  case "platform-architecture-reference":
                    platformArchitectureReference.push(node);
                    break;
                  case "reusable-code-and-services":
                    reusableCodeAndServices.push(node);
                    break;
                  case "training-and-learning":
                    trainingAndLearning.push(node);
                    break;
                  case "use-github-in-bcgov":
                    useGithubInBcgov.push(node);
                    break;
                  default:
                    noCategory.push(node);
                }
              });

              return (
                <nav id="nav-menu">
                  <ul>
                    <NavListItem
                      id="build-deploy-and-maintain-apps"
                      title="Build, deploy, and maintain apps"
                      links={buildDeployAndMaintainApps}
                    />
                    <NavListItem
                      id="openshift-projects-and-access"
                      title="OpenShift projects and access"
                      links={openshiftProjectsAndAccess}
                    />
                    <NavListItem
                      id="use-github-in-bc-gov"
                      title="Use GitHub in BC Gov"
                      links={useGithubInBcgov}
                    />
                    <NavListItem
                      id="automation-and-resiliency"
                      title="Automation and resiliency"
                      links={automationAndResiliency}
                    />
                    <NavListItem
                      id="app-monitoring"
                      title="App monitoring"
                      links={appMonitoring}
                    />
                    <NavListItem
                      id="design-system"
                      title="Design system"
                      links={designSystem}
                    />
                    <NavListItem
                      id="reusable-code-and-services"
                      title="Reusable code and services"
                      links={reusableCodeAndServices}
                    />
                    <NavListItem
                      id="platform-architecture-reference"
                      title="Platform architecture reference"
                      links={platformArchitectureReference}
                    />
                    <NavListItem
                      id="training-and-learning"
                      title="Training and learning"
                      links={trainingAndLearning}
                    />
                    {noCategory?.length > 0 && (
                      <NavListItem
                        id="uncategorized"
                        title="Uncategorized"
                        links={noCategory}
                      />
                    )}
                  </ul>
                </nav>
              );
            }}
          />
        </StyledDiv>
      )}
    </>
  );
}

Navigation.propTypes = {
  links: PropTypes.array,
};

Navigation.defaultProps = {
  links: [],
};