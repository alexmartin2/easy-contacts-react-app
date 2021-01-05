import React from 'react'

export const Alert = (props) => {
  const { alert } = props;
  if(alert) {
    return (
      <div className={alert.type}>
        <i className="im im-warning-circle"></i> <p>{alert.msg}</p>
      </div>
  )
} else {
  return '';
}
}
