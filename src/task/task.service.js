const useTaskService = (percentage, isChecked) => {

  const gradientColours = ({ barRef, percentage }) => {
    let res;
    const colors = [
      "transparent",
      "YellowGreen",
      "Orange",
      "OrangeRed",
      "Red"
    ];
    if (percentage >= 0 && percentage < 85) { res = colors[1]; }
    else if (percentage > 85 && percentage < 94) { res = colors[2]; }
    else if (percentage > 94 && percentage < 98) { res = colors[3]; }
    else if (percentage > 98 && percentage < 100) { res = colors[4]; }
    else if (percentage > 100) { res = "transparent"; } else { res = colors[0] }
    barRef.current.style.backgroundColor = res;
  };

  const isOverDue = percentage >= 100 && !isChecked;

  return {
    gradientColours,
    isOverDue
  }

}

export default useTaskService;