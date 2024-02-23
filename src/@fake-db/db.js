import './app-bar-search'
import './apps/user-list'
import './jwt'
import mock from './mock'
import './pages/ajuda'
import './pages/faq'

// Apps
import './apps/chat'
import './apps/email'
import './apps/invoice'
import './apps/permissions'

// Dashboard
import './dashboard/analytics'

// forwards the matched request over network
mock.onAny().passThrough()
