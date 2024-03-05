import './app-bar-search'
import './pages/monografias'
import './pages/obras'
import './jwt'
import mock from './mock'
import './pages/ajuda'
import './pages/datatable'
import './pages/faq'
import './pages/profile'
import './pages/utilizadores'

// Apps
import './apps/chat'
import './apps/email'
import './apps/invoice'
import './apps/permissions'

// Dashboard
import './dashboard/analytics'

// forwards the matched request over network
mock.onAny().passThrough()
