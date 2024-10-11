type CalorieDisplayProps = {
  caloriesType: number
  text: string
}

const CalorieDisplay = ({ caloriesType, text } : CalorieDisplayProps) => {
  return (
    <p className="text-white font-bold text-2xl rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange">{caloriesType}</span>
      {text}
    </p>
  )
}

export default CalorieDisplay;