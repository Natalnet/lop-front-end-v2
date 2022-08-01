import React, { Fragment } from 'react'

import _ from 'lodash'
import ContentLoader from 'react-content-loader'

import { LoadingAlert, ErrorAlert, EmptyAlert } from './Alerts'

const CardsLoader = ({ itemsPerRow, itemHeight = 250 }) => {
  const yCoefficient = itemHeight + 30

  return (
    <ContentLoader style={{ width: '100%', height: '100%' }}>
      {Array(3)
        .fill('r')
        .map((r, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            {Array(itemsPerRow)
              .fill('i')
              .map((item, index) => (
                <Fragment key={`item-${index}`}>
                  <rect
                    x={`${34 * index}%`}
                    y={yCoefficient * rowIndex}
                    rx="12"
                    ry="12"
                    width={`${95 / itemsPerRow}%`}
                    height={itemHeight}
                    className="d-none d-xl-inline"
                  />
                </Fragment>
              ))}

            {/* Tablet 2 cards per row */}
            <>
              <rect
                x={0}
                y={yCoefficient * rowIndex}
                rx="12"
                ry="12"
                width={'48%'}
                height={itemHeight}
                className="d-none d-md-inline d-xl-none"
              />
              <rect
                x={'51%'}
                y={yCoefficient * rowIndex}
                rx="12"
                ry="12"
                width={'48%'}
                height={itemHeight}
                className="d-none d-md-inline d-xl-none"
              />
            </>

            {/* Mobile 1 card per row */}
            <>
              <rect
                x={0}
                y={yCoefficient * rowIndex}
                rx="12"
                ry="12"
                width={'100%'}
                height={itemHeight}
                className="d-md-none"
              />
            </>
          </Fragment>
        ))}
    </ContentLoader>
  )
}

const WordContentLoader = ({ height, width, isLoading, children, ...rest }) =>
  isLoading ? (
    <ContentLoader
      height={height}
      width={width}
      preserveAspectRatio="none"
      {...rest}
    >
      <rect x="0" y="0" rx="6" ry="6" height={height} width={width} />
    </ContentLoader>
  ) : (
    children
  )

const LoadWrapper = ({
  isLoading,
  isError,
  isEmpty,
  tableCols,
  cardsPerRow,
  itemHeight,
  className = '',
  children
}) => {
  if (isLoading || isError || isEmpty) {
    if (tableCols) {
      return (
        <>
          {isLoading && (
            <>
              {_.range(0, 12).map(trIndex => (
                <tr key={trIndex}>
                  {_.range(0, tableCols).map(index => (
                    <td key={`table-row-${index}`}>
                      <ContentLoader
                        height="40"
                        width="100%"
                        preserveAspectRatio="none"
                        rtl={index > 0}
                      >
                        {index == 0 && (
                          <>
                            <rect
                              x="0"
                              y="0"
                              rx="6"
                              ry="6"
                              width="40"
                              height="40"
                            />
                            <rect
                              x="50"
                              y="8"
                              rx="4"
                              ry="4"
                              width="180"
                              height="10"
                            />
                            <rect
                              x="50"
                              y="24"
                              rx="4"
                              ry="4"
                              width="120"
                              height="8"
                            />
                          </>
                        )}
                        {index > 0 && index < tableCols - 1 && (
                          <>
                            <rect
                              x="0"
                              y="8"
                              rx="4"
                              ry="4"
                              width="80"
                              height="12"
                            />
                          </>
                        )}
                        {index == tableCols - 1 && (
                          <>
                            <rect
                              x="0"
                              y="0"
                              rx="4"
                              ry="4"
                              width="34"
                              height="34"
                            />
                            <rect
                              x="40"
                              y="0"
                              rx="4"
                              ry="4"
                              width="34"
                              height="34"
                            />
                          </>
                        )}
                      </ContentLoader>
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
          {isError && (
            <tr>
              <td colSpan={tableCols}>
                <ErrorAlert />
              </td>
            </tr>
          )}
          {isEmpty && (
            <tr>
              <td colSpan={tableCols}>
                <EmptyAlert />
              </td>
            </tr>
          )}
        </>
      )
    }

    if (cardsPerRow) {
      return (
        <>
          {isLoading && (
            <CardsLoader itemsPerRow={cardsPerRow} itemHeight={itemHeight} />
          )}
          {isError && <ErrorAlert />}
          {isEmpty && <EmptyAlert />}
        </>
      )
    }

    return (
      <div className={className}>
        {isLoading && <LoadingAlert />}
        {isError && <ErrorAlert />}
        {isEmpty && <EmptyAlert />}
      </div>
    )
  }

  return children
}

export default LoadWrapper
export { CardsLoader, WordContentLoader }
