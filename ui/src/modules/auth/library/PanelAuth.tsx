import { Button, ButtonGroup } from '@/stories/Button'
import SvgArrowLeftCircle from '@/stories/icons/ArrowLeftCircle'
import SvgSearch from '@/stories/icons/Search'
import SvgSettings from '@/stories/icons/Settings'
import SvgTool from '@/stories/icons/Tool'

const PanelAuth = () => {
  return (
    <div className="relative">
      <ButtonGroup align={'center'} gap={10}>
        <Button
          label="コンテスト"
          color="primary"
          size="small"
          className="w-36 min-h-24"
          iconStart={
            <SvgArrowLeftCircle
              width={32}
              height={32}
              color="#fff"
              className="text-primary"
            />
          }
        />
        <Button
          label="コンテスト"
          color="primary"
          size="small"
          className="w-36 min-h-24"
          iconStart={
            <SvgSettings
              width={32}
              height={32}
              color="#fff"
              className="text-primary"
            />
          }
        />
        <Button
          label="コンテスト"
          color="primary"
          size="small"
          className="w-36 min-h-24"
          iconStart={
            <SvgTool
              width={32}
              height={32}
              color="#fff"
              className="text-primary"
            />
          }
        />
        <Button
          label="コンテスト"
          color="primary"
          size="small"
          className="w-36 min-h-24"
          iconStart={
            <SvgArrowLeftCircle
              width={32}
              height={32}
              color="#fff"
              className="text-primary"
            />
          }
        />
        <Button
          label="コンテスト"
          color="primary"
          size="small"
          className="w-36 min-h-24"
          iconStart={
            <SvgSettings
              width={32}
              height={32}
              color="#fff"
              className="text-primary"
            />
          }
        />
      </ButtonGroup>
    </div>
  )
}

export default PanelAuth
