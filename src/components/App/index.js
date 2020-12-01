import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Sidebar } from 'components/Sidebar';
import s from './s.module.css';

const OverviewPage = lazy(() => import('components/OverviewPage'));
const MintPage = lazy(() => import('components/MintPage'));
const RedeemPage = lazy(() => import('components/RedeemPage'));
const EarnPage = lazy(() => import('components/EarnPage'));

const PageLoading = () => <>loading...</>;

export function App() {
  return (
    <>
      <Header />
      <div className={s.mainContainer}>
        <Sidebar />
        <main className={s.main}>
          <Suspense fallback={<PageLoading />}>
            <Switch>
              <Route exact path="/" component={OverviewPage} />
              <Route path="/mint" component={MintPage} />
              <Route path="/redeem" component={RedeemPage} />
              <Route path="/earn" component={EarnPage} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
}
