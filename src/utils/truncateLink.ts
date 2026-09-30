const truncateLink = (link: string, maxLength = 50) => {
  console.log("truncateLink accepted", link);
  console.trace("truncatelink called from: ");

  return link.length > maxLength ? link.substring(0, maxLength)
  + "..." : link;
};

export default truncateLink;
