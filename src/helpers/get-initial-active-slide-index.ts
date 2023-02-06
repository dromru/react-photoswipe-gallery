function getInitialActiveSlideIndex(
  index: number | null,
  targetId: string | null | undefined,
): number {
  if (index !== null) {
    return index
  }

  return targetId ? parseInt(targetId, 10) - 1 : 0
}

export default getInitialActiveSlideIndex
