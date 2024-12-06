import { Button, ButtonGroup } from '@/stories/Button'
import SvgArrowLeftCircle from '@/stories/icons/ArrowLeftCircle'
import SvgSettings from '@/stories/icons/Settings'
import SvgTool from '@/stories/icons/Tool'

const PanelAuth = () => {
  return (
    <div className="relative">
      <ButtonGroup align={'center'} gap={10}>
        <Button
          copy="コンテスト"
          color="primary"
          media="small"
          className="w-36 min-h-24 text-2xl"
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
          active
          className="text-lg p-4 border-1 w-40"
          color="secondary"
          copy="コンテスト"
          media="large"
          onClick={() => {}}
          iconStart={
            <SvgArrowLeftCircle
              width={32}
              height={32}
              color="#fff"
              className="text-secondary"
            />
          }
          outlined
        />
        <Button
          copy="コンテスト"
          color="primary"
          media="small"
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
          copy="コンテスト"
          color="primary"
          media="small"
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
          copy="コンテスト"
          color="primary"
          media="small"
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
