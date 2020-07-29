import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import { RequestError, adminUIAccess } from "src/util";
import spinner from "src/assets/spinner.gif";
import styles from "./loading.module.scss";

interface LoadingProps {
  loading: boolean;
  error?: Error | Error[] | null;
  className?: string;
  image?: string;
  render: () => any;
}

const cx = classNames.bind(styles);

/**
 * getValidErrorsList eliminates any null Error values, and returns either
 * null or a non-empty list of Errors.
 */
function getValidErrorsList(errors?: Error | Error[] | null): Error[] | null {
  if (errors) {
    if (!Array.isArray(errors)) {
      // Put single Error into a list to simplify logic in main Loading component.
      return [errors];
    } else {
      // Remove null values from Error[].
      const validErrors = errors.filter(e => !!e);
      if (validErrors.length === 0) {
        return null;
      }
      return validErrors;
    }
  }
  return null;
}

/**
 * getDetails produces a hint for the given error object.
 */
function getDetails(error: Error): ReactNode {
  if (error instanceof RequestError) {
    if (error.status === 403) {
      return (
        <p>
          Insufficient privileges to view this resource.{" "}
          <a href={adminUIAccess} target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </p>
      );
    }
  }
  return <p>no details available</p>;
}

/**
 * Loading will display a background image instead of the content if the
 * loading prop is true.
 */
export const Loading: React.FC<LoadingProps> = props => {
  const className =
    props.className || cx("loading-image", "loading-image__spinner");
  const imageURL = props.image || spinner;
  const image = {
    backgroundImage: `url(${imageURL})`,
  };

  const errors = getValidErrorsList(props.error);

  // Check for `error` before `loading`, since tests for `loading` often return
  // true even if CachedDataReducer has an error and is no longer really "loading".
  if (errors) {
    const errorCountMessage =
      errors.length > 1
        ? "Multiple errors occurred"
        : "An error was encountered";
    return (
      <div className={cx("loading-error")}>
        <p>{errorCountMessage} while loading this data:</p>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>
              <b>{error.message}</b>
              {getDetails(error)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (props.loading) {
    return <div className={className} style={image} />;
  }
  return props.render();
};
